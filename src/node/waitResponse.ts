import * as console from 'console';
import {ensure, isPositiveSafeInteger} from '@nlib/typing';
import type * as http from 'http';

interface Response extends http.IncomingMessage {
    statusCode: number,
}

export const waitResponse = async (request: http.ClientRequest): Promise<Response> => {
    console.info(`> ${request.method} ${request.protocol}${request.host}${request.path}`);
    const response = await new Promise<http.IncomingMessage>((resolve, reject) => {
        request.once('error', reject);
        request.once('response', resolve);
        if (!request.writableEnded) {
            request.end();
        }
    });
    const statusCode = ensure(response.statusCode, isPositiveSafeInteger);
    console.info(`< ${statusCode} ${response.statusMessage}`);
    return Object.assign(response, {statusCode});
};
