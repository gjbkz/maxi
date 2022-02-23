import type {NextApiHandler} from 'next';

const handler: NextApiHandler = async (_req, res) => {
    await Promise.resolve();
    res.writeHead(200, {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'public, max-age=3600',
    });
    res.write(JSON.stringify([1, 2, 3, 4], null, 2));
    res.end();
};

export default handler;
