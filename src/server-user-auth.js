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

const callback_url = 'oauth/authorize/callback';
const consumer_key = '0ieOQlmM3GDeNKHaVxFaikZpp';
const consumer_secret = 'J4mZ86dQCYW5tAIVuaFvl8XzH2yDNke72K4z8fjhzjzKAiXDjz';

app.prepare().then(() => {
    createServer((req, res) => {
        // Be sure to pass `true` as the second argument to `url.parse`.
        // This tells it to parse the query portion of the URL.
        const parsedUrl = parse(req.url, true);
        const { pathname, query } = parsedUrl;

        // https://developer.twitter.com/en/docs/basics/authentication/overview/3-legged-oauth

        if (pathname === '/oauth/authorize') {
            // STEP 1
            // Make POST request with app creds to get a request token

            const options = {
                url: 'https://api.twitter.com/oauth/request_token',
                method: 'POST',
                oauth: {
                    callback: encodeURI(`http://localhost:3000/${callback_url}`),
                    consumer_key: consumer_key,
                    consumer_secret: consumer_secret
                }
            }
            
            request(options, function(err, response, body) {
                if (err) throw err;

                const data = qs.parse(body);
                const { oauth_callback_confirmed, oauth_token, oauth_token_secret } = data;


                // STEP 2.1
                // Redirect user to sign-in, which will then redirect to application callback URL
                res.writeHead(302, { Location: `https://api.twitter.com/oauth/authorize?oauth_token=${oauth_token}` });
                res.end();
            });
        } else if (pathname === `/${callback_url}`) {
            // STEP 2.2
            // Obtain query params for oauth token
            const { query } = parse(req.url);
            const { oauth_token, oauth_verifier } = qs.parse(query);


            // STEP 3
            // exchange session-based request token for a user-based access token
            const options = {
                url: 'https://api.twitter.com/oauth/access_token',
                method: 'POST',
                oauth: {
                    consumer_key: consumer_key,
                    token: oauth_token,
                },
                form: { oauth_verifier: oauth_verifier }
            }

            request(options, function(err, response, body) {
                if (err) throw err;

                const data = qs.parse(body);
                const params = Object.keys(data).reduce((acc, val, i) => {
                    i > 0 ? acc += '&' : null;
                    acc += `${val}=${data[val]}`;
                }, '');

                res.writeHead(302, { Location: `/tweets?${params}` });
                res.end();
            });
        } else if (pathname === '/api/tweets') {
            // oauth_token=140301959-GXn7mU02q3UzmSebIufpiDlN3M1r1AfBDyILwl1S
            // oauth_token_secret=r65x7BZzg4YjueOKWurMWB5odonfh2gzDsvYf1uwFcjOo
            // user_id=140301959
            // screen_name=stuffmattdoesnt
            
            console.log(parse(req.url).query);
            
            const options = {
                url: `https://api.twitter.com/1.1/statuses/user_timeline.json?${parse(req.url).query}`,
                method: 'GET',
                oauth: {
                    consumer_key: consumer_key,
                    consumer_secret: consumer_secret,
                    token: '140301959-GXn7mU02q3UzmSebIufpiDlN3M1r1AfBDyILwl1S',
                    token_secret: 'r65x7BZzg4YjueOKWurMWB5odonfh2gzDsvYf1uwFcjOo'
                }
            }

            // Request tweets
            request(options, function(err, response, body) {
                if (err) throw err;

                res.setHeader('Content-Type', 'application/json');
                res.end(body);
            });
        } else {
            handle(req, res, parsedUrl);
        }
    }).listen(3000, err => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});