import App, { Container } from 'next/app';
import Head from 'next/head';
import React from 'react';

export default class extends App {
    // Next.js-specific lifecycle method, called on server, populates as props in component
    static async getInitialProps({ Component, ctx, router }) {
        const userAgent = ctx.req ? ctx.req.headers['user-agent'] : navigator.userAgent;
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }

    render () {
        const { Component, pageProps } = this.props;
        
        return <Container>
            <Head>
                <title>Auto Archive</title>
            </Head>
            <main className='app'>
                <Component {...pageProps} />
            </main>
        </Container>
    }
}