// Libs
import Head from 'next/head'

// Components
import Button from '../components/button';
import Text from '../components/text';

// Styles
import './index.scss';

export default () => (
    <div className='container'>
        <Head>
            <title>Auto Archive</title>
        </Head>
        <Text.Heading1>Deplatformed?</Text.Heading1>
        <Text.Heading2>Download your Tweets and upload 'em to Gab (automatically).</Text.Heading2>
        <Button.Link href='/oauth/authorize'>Login to Twitter</Button.Link>
    </div>
);