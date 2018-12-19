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

app.prepare().then(() => {
    createServer((req, res) => {
        // Be sure to pass `true` as the second argument to `url.parse`.
        // This tells it to parse the query portion of the URL.
        const parsedUrl = parse(req.url, true);
        const { pathname, query } = parsedUrl;

        if (pathname === '/oauth/authorize') {
            // console.log('HIT DAT PATH');
            // https://developer.twitter.com/en/docs/basics/authentication/overview/3-legged-oauth STEP 1

            // make your POST https://api.twitter.com/oauth/authenticate?oauth_callback=<yourcallback>
            const options = {  
                url: 'https://api.twitter.com/oauth/request_token',
                method: 'POST',
                oauth: {
                    callback: encodeURI('http://localhost:3000/callback'),
                    consumer_key: '0NZDSYfbJi3GR080SDM5QEgET',
                    consumer_secret: 'eCBbYRIgLg1t8DIA5qwtN8zHGGdpNHXRWhQ7iVFoYbSd09ZT9G'
                }
            };
            
            request(options, function(err, response, body) {
                if (err) {
                    // handle error
                    console.error('Error', err);
                }

                let data = qs.parse(body);
                console.log('Body', data);

                // redirect header?  not sure what methods exist on create server handler func
                res.writeHead(302, { Location: `https://api.twitter.com/oauth/authorize?oauth_token=${data.oauth_token}` });
                res.end();
            });
        } else if (pathname === '/oauth/callback') {
            // https://developer.twitter.com/en/docs/basics/authentication/overview/3-legged-oauth STEP 2
            // take the redirected query parameters
            app.redirect('/');
        } else {
            // console.log('ELSE');
            handle(req, res, parsedUrl);
        }
    }).listen(3000, err => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});