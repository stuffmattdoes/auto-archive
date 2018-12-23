// Libs
import axios from 'axios';
import classnames from 'classnames';
import React from 'react';

// Components
import Button from '../components/button';
import Loader from '../components/loader';
import Text from '../components/text';

// Styles
import './index.scss';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            isFetching: false,
            selected: [],
            tweets: [],
            user: null
        }

        this.onSelectTweet = this.onSelectTweet.bind(this);
        this.pluralize = this.pluralize.bind(this);
        this.renderTweet = this.renderTweet.bind(this);
        this.filter = this.filter.bind(this);
    }

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

        this.setState({ isFetching: true });

        axios.get(`/api/tweets?&screen_name=${screen_name}&count=25&tweet_mode=extended`, options)
            .then(res => {
                const user = {
                    description: res.data[0].user.description,
                    id: res.data[0].user.id,
                    location: res.data[0].user.location,
                    name: res.data[0].user.name,
                    profilePhoto: res.data[0].user.profile_image_url_https,
                    screen_name: res.data[0].user.screen_name,
                    tweetsCount: res.data[0].user.statuses_count,
                    verified: res.data[0].user.verified
                }

                this.setState({
                    isFetching: false,
                    selected: res.data.map(tweet => tweet.id),
                    tweets: res.data,
                    user: user
                });
            })
            .catch(err => console.warn(err) && this.setState({ isFetching: false }));
    }

    onSelectTweet(event) {
        const { checked, value } = event.target;        
        let nextSelected = this.state.selected;
        const valueInt = parseInt(value);
        const isSelected = nextSelected.find(tweetId => tweetId === valueInt);

        if (isSelected) {
            nextSelected = nextSelected.filter(tweetId => tweetId !== valueInt);
        } else {
            nextSelected.push(valueInt);
        }

        this.setState({ selected: nextSelected });
    }

    pluralize(word, plural) {
        return plural ? word + 's' : word;
    }

    renderTweet(tweet, i) {
        const date = new Date(tweet.created_at);
        const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
        const dateStr = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
        const { selected } = this.state;
        const isSelected = selected.find(tweetId => tweetId === tweet.id) ? true : false;
        const userMatches = tweet.full_text.split(/(@[a-zA-Z0-9_]+)/);

        for (let i = 1; i < userMatches.length; i += 2) {
            userMatches[i] = <strong key={i}>{userMatches[i]}</strong>;
        }

        return (
            <li className={classnames([
                'tweet',
                { 'tweet--selected': isSelected }
            ])} key={tweet.id}>
                <span>
                    <input
                        checked={isSelected}
                        className='checkbox'
                        onChange={this.onSelectTweet}
                        type='checkbox'
                        value={tweet.id}
                    />
                </span>
                <span>
                    <Text.Body2>{dateStr}</Text.Body2>
                    <pre><Text.Body1>{userMatches}</Text.Body1></pre>
                </span>
            </li>
        );
    }

    filter(event) {
        const { selected, tweets } = this.state;
        const { checked, id } = event.target;
        let nextSelected = selected.slice();

        if (id === 'toggle-all') {
            if (checked) {
                nextSelected = tweets.map(tweet => tweet.id);
            } else {
                nextSelected = [];
            }
        } else if (id === 'toggle-retweets' || id === 'toggle-replies') {
            const propToFilter = id === 'toggle-retweets' ? 'retweeted' : 'in_reply_to_status_id';
            const idsToFilter = tweets.filter(tweet => tweet[propToFilter]).map(tweet => tweet.id);

            if (event.target.checked) {
                let toAdd = idsToFilter.filter(tweetId => !nextSelected.includes(tweetId));
                nextSelected = nextSelected.concat(toAdd);
            } else {
                nextSelected = nextSelected.filter(tweetId => !idsToFilter.includes(tweetId));
            }
        }

        this.setState({ selected: nextSelected });
    }

    render() {
        const { oauth_token, oauth_token_secret, user_id, screen_name } = this.props.query;
        const { isFetching, selected, selectAll, selectReplies, selectRetweets, tweets, user } = this.state;

        return (
            <>
                { isFetching || tweets.length === 0 ?
                    <>
                        <Text.Body1>Fetching tweets...</Text.Body1>
                        <Loader size='large' />
                    </>
                    : <>
                        <div className='profile'>
                            <div className='profile__photo'><img src={user.profilePhoto} /></div>
                            <div>
                                <Text.Heading2>@{screen_name}'s tweets:</Text.Heading2>
                                <Text.Body2>{user.tweetsCount} total tweets</Text.Body2>
                            </div>
                        </div>
                        <div className='filter'>
                            <input className='checkbox' defaultChecked={true} id='toggle-all' onChange={this.filter} type='checkbox' /><label htmlFor='toggle-all'>Select all</label>
                            <input className='checkbox' defaultChecked={true} id='toggle-retweets' onChange={this.filter} type='checkbox' /><label htmlFor='toggle-retweets'>Include retweets</label>
                            <input className='checkbox' defaultChecked={true} id='toggle-replies' onChange={this.filter} type='checkbox' /><label htmlFor='toggle-replies'>Include replies</label>
                        </div>
                        <ul className='list list--scroll'>
                            {tweets.map(this.renderTweet)}
                        </ul>
                        <Text.Body1>Download {selected.length} of {tweets.length} most recent tweets</Text.Body1>
                        <Button.Link disabled={selected.length === 0} href='/oauth/authorize'>Upload to Gab</Button.Link>
                    </>
                }
            </>
        );
    }
}
