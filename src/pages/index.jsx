// Libs
import axios from 'axios';
import React from 'react';
import Router from 'next/router';

// Components
import { Button, Icon, Text } from '../components/';

export default class extends React.Component {
    componentDidMount() {
        const oauth_token = localStorage.getItem('access_token');
        const oauth_token_secret = localStorage.getItem('access_token_secret');

        if (oauth_token && oauth_token_secret) {
            const options = {
                headers: {
                    Authorization: `OAuth oauth_token="${oauth_token}",oauth_token_secret="${oauth_token_secret}"`
                }
            }

            axios.get('/api/user', options)
                .then(res => {
                    const { screen_name } = res.data;
                    // Router.push(`/tweets?oauth_token=${oauth_token}&oauth_token_secret=${oauth_token_secret}&screen_name=${screen_name}`);
                })
                .catch(console.log);
        }
    }

    render() {
        return (
            <div className='valign--center'>
                <Text.Heading1>Auto Archive</Text.Heading1>
                <Text.Body1>Download your Tweets and upload 'em to Gab (automatically).</Text.Body1>
                <Button.Link className='icon-text bg-color--twitter-blue' href='/oauth/authorize'><Icon icon='twitter' fill='#fff' width={24} height={24} />Login to Twitter</Button.Link>
            </div>
        );
    }
}
