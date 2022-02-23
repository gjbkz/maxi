import {useEffect, useState} from 'react';

const Page = () => {
    const [message, setMessage] = useState('Loading...');
    useEffect(() => {
        fetch('/api/sources')
        .then(async (response) => {
            const list: unknown = await response.json();
            if (Array.isArray(list)) {
                setMessage(list.map((d) => JSON.stringify(d)).join('\n'));
            }
        })
        .catch((error) => {
            setMessage(`${error}`);
        });
    }, []);
    return <pre>{message}</pre>;
};

export default Page;
