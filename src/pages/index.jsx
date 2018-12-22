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
