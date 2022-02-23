import type {CellNode} from '../type';

export const listTextContentOfCellNodes = function* (nodes: Array<CellNode>) {
    for (const node of nodes) {
        yield node.text;
    }
};
export const listLinkUrlOfCellNodes = function* (nodes: Array<CellNode>) {
    for (const node of nodes) {
        if (node.type === 'link') {
            yield node.url;
        }
    }
};
export const getTextContentOfCellNodes = (nodes: Array<CellNode>) => [...listTextContentOfCellNodes(nodes)].join('').trim();
export const getFirstLinkUrlOfCellNodes = (nodes: Array<CellNode>) => listLinkUrlOfCellNodes(nodes).next().value || undefined;
