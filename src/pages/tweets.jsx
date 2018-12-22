// Libs
import axios from 'axios';
import Head from 'next/head';
// import Router from 'next/router';
import React from 'react';

// Components
import Button from '../components/button';
import Text from '../components/text';

// Styles
import './index.scss';

export default class extends React.Component {
    static async getInitialProps({ asPath, err, jsonPageRes, pathname, req, res, query }) {
        const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;

        return { userAgent, query };
    }

    componentDidMount() {
        const { oauth_token, oauth_token_secret, user_id, screen_name } = this.props.query;
        const options = {
            headers: {
                Authorization: `OAuth oauth_token=${oauth_token},oauth_token_secret=${oauth_token_secret}`
            }
        };
        
        axios.get(`/api/tweets?token=${oauth_token}&token_secret=${oauth_token_secret}&screen_name=${screen_name}&count=10`, options)
            .then(res => console.log('Success!', res.data))
            .catch(err => console.log('Error:', err.message));
    }

    render() {
        const { oauth_token, oauth_token_secret, user_id, screen_name } = this.props.query;

        return (
            <>
                <Text.Heading1>Success!</Text.Heading1>
                <Text.Body1>Logged in with @{screen_name}.</Text.Body1>
                <Button.Link href='/oauth/authorize'>Login to Gab</Button.Link>
            </>
        );
    }
}
