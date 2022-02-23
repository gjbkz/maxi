import type * as stream from 'stream';
import * as htmlparser2 from 'htmlparser2/lib/WritableStream';
import type {CellNode} from '../type';

type Cell = Array<CellNode>;
type Row = Array<Cell>;

type Token =
| {type: 'BeginTable'}
| {type: 'EndTable'}
| {type: 'Row', children: Row};

// eslint-disable-next-line max-lines-per-function
export const parseHtmlTable = async function* (readable: stream.Readable) {
    let tokens: Array<Token> = [];
    let row: Row | null = null;
    let cell: Cell | null = null;
    let node: CellNode | null = null;
    const flushNode = () => {
        if (cell && node) {
            if (node.type !== 'text' || node.text) {
                cell.push(node);
            }
            node = null;
        }
    };
    const flushCell = () => {
        if (row && cell) {
            flushNode();
            if (0 < cell.length) {
                row.push(cell);
            }
            cell = null;
        }
    };
    const flushRow = () => {
        if (row) {
            flushCell();
            if (0 < row.length) {
                tokens.push({type: 'Row', children: row});
            }
            row = null;
        }
    };
    const onopentag = (tagName: string, attributes: Record<string, string>) => {
        switch (tagName.toLowerCase()) {
        case 'td':
        case 'th':
            if (row) {
                cell = [];
                node = {type: 'text', text: ''};
            }
            break;
        case 'a':
            if (cell) {
                flushNode();
                node = {type: 'link', url: attributes.href, text: ''};
            }
            break;
        case 'tr':
            row = [];
            break;
        case 'table':
            tokens.push({type: 'BeginTable'});
            break;
        default:
        }
    };
    const ontext = (text: string) => {
        if (node) {
            node.text += text.trim();
        }
    };
    const onclosetag = (tagName: string) => {
        switch (tagName.toLowerCase()) {
        case 'td':
        case 'th':
            flushCell();
            break;
        case 'a':
            if (cell) {
                flushNode();
                node = {type: 'text', text: ''};
            }
            break;
        case 'tr':
            flushRow();
            break;
        case 'table':
            tokens.push({type: 'EndTable'});
            break;
        default:
        }
    };
    const onend = flushRow;
    const parser = new htmlparser2.WritableStream({onopentag, ontext, onclosetag, onend});
    for await (const chunk of readable) {
        parser.write(chunk);
        yield* tokens;
        // eslint-disable-next-line require-atomic-updates
        tokens = [];
    }
};
