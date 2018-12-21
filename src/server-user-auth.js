// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const request = require('request');
const qs = require('querystring');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: 'src' });
const handle = app.getRequestHandler();

const consumer_key = 'fjv1VccGnXStB0mLP71iTe2Mr';
const consumer_secret = 'o1gqF23uY2j837UC9Bt8vU7OZvmfS8Z9HpQyATdOQHlCp3Rnks';

app.prepare().then(() => {
    createServer((req, res) => {
        // Be sure to pass `true` as the second argument to `url.parse`.
        // This tells it to parse the query portion of the URL.
        const parsedUrl = parse(req.url, true);
        const { pathname, query } = parsedUrl;

        // https://developer.twitter.com/en/docs/basics/authentication/overview/3-legged-oauth

        if (pathname === '/oauth/authorize') {
            // STEP 1
            // make your POST https://api.twitter.com/oauth/authenticate?oauth_callback=<yourcallback>

            const options = {
                url: 'https://api.twitter.com/oauth/request_token',
                method: 'POST',
                oauth: {
                    callback: encodeURI('http://localhost:3000/callback'),
                    consumer_key: consumer_key,
                    consumer_secret: consumer_secret
                }
            }
            
            request(options, function(err, response, body) {
                if (err) {
                    // handle error
                    console.error('Error', err);
                }

                const data = qs.parse(body);
                const { oauth_callback_confirmed, oauth_token, oauth_token_secret } = data;

                // STEP 2.1
                // Redirect user to sign-in, which will then redirect to application callback URL
                res.writeHead(302, { Location: `https://api.twitter.com/oauth/authorize?oauth_token=${oauth_token}` });
                res.end();
            });
        } else if (pathname === '/callback') {
            // STEP 2.2
            // Obtain query params for oauth token
            const { query } = parse(req.url);
            const { oauth_token, oauth_verifier } = qs.parse(query);

            console.log(req.method);

            // STEP 3
            // exchange session-based request token for a user-based access token

            const options = {
                url: 'https://api.twitter.com/oauth/access_token',
                method: 'POST',
                oauth: {
                    consumer_key: consumer_key,      // Was added in previous step
                    oauth_token: oauth_token,        // Was added in previous step
                    oauth_verifier: oauth_verifier
                }
            }

            request(options, function(err, response, body) {
                if (err) {
                    // handle error
                    console.error('Error', err);
                }

                const data = qs.parse(body);
                console.log(data);
                const { oauth_token, oauth_token_secret } = data;

                res.writeHead(302, { Location: '/' });
                res.end();
            });
        } else {
            handle(req, res, parsedUrl);
        }
    }).listen(3000, err => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});