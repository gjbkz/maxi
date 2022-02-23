export const siteName = 'MAXI Data Viewer';

export const ContentType = {
    json: 'application/json; charset=utf-8',
    csv: 'text/csv; charset=utf-8',
} as const;

export const StatusCode = {
    OK: 200,
    ServiceUnavailable: 503,
} as const;

export const CacheControl = {
    nocache: 'no-cache',
    hour: 'public, max-age=3600',
    day: 'public, max-age=86400',
};
