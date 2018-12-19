// Server-rendered HTML template. This file is only necessary if you want to override the default genedeated HTML
import Document, { Head, Main, NextScript } from 'next/document';

export default class extends Document {
    render() {
        return (
            <html>
                <Head>
                    {/* <link rel='stylesheet' href='/_next/static/style.css' /> */}
                    <meta charset='utf-8' />
                    <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
