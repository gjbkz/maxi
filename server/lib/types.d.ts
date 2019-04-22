/// <reference types="node" />
import * as stream from 'stream';
export declare type ITableLike<TType = string | number | null | undefined> = Array<Array<TType>>;
export interface IStreamReader<TResult = any> {
    (readable: stream.Readable): Promise<TResult>;
}
export interface IXSVMapper<TValue> {
    (input: string, index: number): TValue;
}