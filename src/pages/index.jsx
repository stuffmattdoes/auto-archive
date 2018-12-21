// Libs
import axios from 'axios';
import Head from 'next/head';
import React from 'react';

// Components
import Button from '../components/button';
import Text from '../components/text';

// Styles
import './index.scss';

export default class extends React.Component {
    static async getInitialProps({ asPath, err, jsonPageRes, pathname, req, res,  query }) {
        const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;

        return { userAgent, query };
    }

    render() {
        // console.log(this.props);

        return (
            <div className='container'>
                <Head>
                    <title>Auto Archive</title>
                </Head>
                <Text.Heading1>Deplatformed?</Text.Heading1>
                <Text.Body1>Download your Tweets and upload 'em to Gab (automatically).</Text.Body1>
                <Button.Link href='/oauth/authorize'>Login to Twitter</Button.Link>
            </div>
        );
    }
}
