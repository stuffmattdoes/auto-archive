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
        const parsedUrl = parse(req.url, true)
        const { pathname, query } = parsedUrl
        
        // https://developer.twitter.com/en/docs/basics/authentication/overview/application-only
        
        if (pathname === '/a') {
            app.render(req, res, '/b', query);
        } else if (pathname === '/b') {
            app.render(req, res, '/a', query);
        } else {
            handle(req, res, parsedUrl);
        }

    }).listen(3000, err => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});