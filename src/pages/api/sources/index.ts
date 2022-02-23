import * as http from 'http';
import type {NextApiHandler} from 'next';
import {CacheControl, ContentType, StatusCode} from '../../../constants';
import {getFirstLinkUrlOfCellNodes, getTextContentOfCellNodes} from '../../../es/CellNode';
import {parseHtmlTable} from '../../../node/parseHtmlTable';
import {waitResponse} from '../../../node/waitResponse';
import type {CellNode, SourceData} from '../../../type';

const url = new URL('http://maxi.riken.jp/top/slist.html');
const getSourceId = (nodes: Array<CellNode>) => {
    const link = getFirstLinkUrlOfCellNodes(nodes);
    if (link) {
        const [p1, p2, p3] = new URL(link, url).pathname.slice(1).split('/');
        switch (p1) {
        case 'pubdata':
            return p3;
        case 'star_data':
            return p2;
        default:
        }
    }
    return undefined;
};
const parseTable = async (response: http.IncomingMessage) => {
    let rowIndex = 0;
    const sourceList: Array<SourceData> = [];
    for await (const token of parseHtmlTable(response)) {
        switch (token.type) {
        case 'Row':
            if (0 < rowIndex++) {
                const [sourceName, pos, v7lrkn, v7l, v6m] = token.children;
                const [ra, dec] = getTextContentOfCellNodes(pos).split(/\s*,\s*/);
                sourceList.push({
                    sourceName: getTextContentOfCellNodes(sourceName),
                    ra: Number.parseFloat(ra),
                    dec: Number.parseFloat(dec),
                    v7lrkn: getSourceId(v7lrkn),
                    v7l: getSourceId(v7l),
                    v6m: getSourceId(v6m),
                });
            }
            break;
        case 'EndTable':
            return sourceList;
        default:
        }
    }
    throw new Error('NoEndTable');
};

// eslint-disable-next-line max-lines-per-function
const handler: NextApiHandler = async (_req, res) => {
    const request = http.request(url, {method: 'GET'});
    const response = await waitResponse(request);
    if (response.statusCode !== StatusCode.OK) {
        res.writeHead(StatusCode.ServiceUnavailable, {'content-type': ContentType.json});
        res.end(JSON.stringify({error: 'ServiceUnavailable'}));
        return;
    }
    const buffer = Buffer.from(JSON.stringify(await parseTable(response)));
    res.writeHead(200, {
        'content-length': `${buffer.byteLength}`,
        'content-type': ContentType.csv,
        'cache-control': CacheControl.day,
    });
    res.end(buffer);
};

export default handler;
