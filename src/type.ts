export interface ApiEndpoint {
    url: string,
    method: 'GET' | 'POST',
}

export interface TextCellNode {
    type: 'text',
    text: string,
}

export interface LinkCellNode {
    type: 'link',
    url: string,
    text: string,
}

export type CellNode = LinkCellNode | TextCellNode;

export interface SourceData {
    sourceName: string,
    ra: number,
    dec: number,
    v7lrkn?: string,
    v7l?: string,
    v6m?: string,
}
