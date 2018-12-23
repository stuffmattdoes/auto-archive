// Libs
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

        // if (oauth_token && oauth_token_secret) {
        //     Router.push('/tweets');
        // }
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
