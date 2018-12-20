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
    static async getInitialProps({ req, query }) {
        const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;

        return { userAgent, query };
    }

    componentDidMount() {
        // const { consumer_key, oauth_token, oauth_verifier } = this.props.query;

        // if (consumer_key && oauth_token && oauth_verifier) {
        //     console.log('STEP 3');

        //     axios.post('https://api.twitter.com/1.1/statuses/update.json', null, {
        //         oauth: {
        //             oauth_token: '140301959-GXn7mU02q3UzmSebIufpiDlN3M1r1AfBDyILwl1S',
        //             oauth_consumer_key: 'fjv1VccGnXStB0mLP71iTe2Mr'
        //         }
        //     }).then(console.log).catch(console.log);
        // }
        
    }

    render() {
        // console.log(this.props);

        return (
            <div className='container'>
                <Head>
                    <title>Auto Archive</title>
                </Head>
                <Text.Heading1>Deplatformed?</Text.Heading1>
                <Text.Heading2>Download your Tweets and upload 'em to Gab (automatically).</Text.Heading2>
                <Button.Link href='/oauth/authorize'>Login to Twitter</Button.Link>
            </div>
        );
    }
}
