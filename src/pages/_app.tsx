import type {AppProps} from 'next/app';
import {SiteHeader} from '../components/ui/SiteHeader';
import {SiteFooter} from '../components/ui/SiteFooter';

const Root = ({Component, pageProps}: AppProps) => <>
    <SiteHeader/>
    <Component {...pageProps}/>
    <SiteFooter/>
</>;

export default Root;
