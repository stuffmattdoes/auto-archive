// Libs
import axios from 'axios';
import React from 'react';
import Router from 'next/router'

// Components
import Button from '../components/button';
import Text from '../components/text';

// Styles
import './index.scss';

export default class extends React.Component {
    componentDidMount() {
        const oauth_token = localStorage.getItem('access_token');
        const oauth_token_secret = localStorage.getItem('access_token_secret');

        if (oauth_token && oauth_token_secret) {
            const options = {
                headers: {
                    Authorization: `OAuth oauth_token="${oauth_token}",oauth_token_secret="${oauth_token_secret}"`
                }
            };

            axios.get(`/api/user?oauth_token=${oauth_token}&oauth_token_secret=${oauth_token_secret}`, options)
                .then(console.log)
                .catch(console.log);
            // Router.push('/tweets');
        }
    }

    render() {
        return (
            <>
                <Text.Heading1>Auto Archive</Text.Heading1>
                <Text.Body1>Download your Tweets and upload 'em to Gab (automatically).</Text.Body1>
                <Button.Link href='/oauth/authorize'>Login to Twitter</Button.Link>
            </>
        );
    }
}
