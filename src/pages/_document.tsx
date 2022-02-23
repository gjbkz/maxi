/* eslint-disable @next/next/no-page-custom-font */
import {Html, Head, Main, NextScript} from 'next/document';
import {siteName} from '../constants';

const Document = () => <Html lang="ja">
    <Head>
        <meta name="og:site_name" content={siteName}/>
    </Head>
    <Main/>
    <NextScript/>
</Html>;

export default Document;
