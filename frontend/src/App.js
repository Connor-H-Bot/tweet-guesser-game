import React, { useEffect, useState } from "react";
import "./App.css"; // Make sure to add styles here or edit existing CSS file

const TweetsGame = () => {
  const [tweet1, setTweet1] = useState(null);
  const [tweet2, setTweet2] = useState(null);
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  // Function to fetch two tweets from the API
  const fetchTweets = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/random_tweets_view", {
        method: "GET",
        mode: "cors", // Make sure this is set
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = await response.json();

      setTweet1({
        type: data.tweets[0].tweet_type,
        text: data.tweets[0].tweet_content,
        id: data.tweets[0].id,
        year: data.tweets[0].year,
      });

      setTweet2({
        type: data.tweets[1].tweet_type,
        text: data.tweets[1].tweet_content,
        id: data.tweets[1].id,
        year: data.tweets[1].year,
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching tweets:", error);
      setLoading(false);
    }
  };

  // Function to handle tweet selection (sends API call)
  const handleTweetClick = async (tweet) => {
    if (tweet.type == "fake") {
      setCounter(0);
    } else {
      setCounter(counter + 1);
    }

    await fetchTweets();
  };

  // Fetch tweets on component mount
  useEffect(() => {
    fetchTweets();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const Tweet = ({ tweetData, handleClick }) => {
    return (
      <div onClick={handleClick} className="button unselectable flip-card">
        <div className="tweet-wrap flip-card-inner hover-outline">
          <div className="flip-card-front">
            <div className="tweet-header">
              <img
                src={tweetData.profilePic}
                alt="Profile"
                className="avatar"
              />
              <div className="tweet-header-info">
                {tweetData.username}
                <object
                  data={tweetData.verifiedBadge}
                  width="15"
                  height="15"
                  style={{ verticalAlign: "middle", paddingLeft: "5px" }}
                ></object>
                <span>@{tweetData.handle}</span>
                <span>{tweetData.date}</span>
                <p>{tweetData.body}</p>
              </div>
            </div>
            <div className="tweet-info-counts">
              <div className="comments">
                <svg
                  class="feather feather-message-circle sc-dnqmqq jxshSx"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </div>
              <div className="retweets">
                <svg
                  class="feather feather-repeat sc-dnqmqq jxshSx"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="17 1 21 5 17 9"></polyline>
                  <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                  <polyline points="7 23 3 19 7 15"></polyline>
                  <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                </svg>
              </div>
              <div className="likes">
                <svg
                  class="feather feather-heart sc-dnqmqq jxshSx"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <div className="message">
                <svg
                  class="feather feather-send sc-dnqmqq jxshSx"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const tweetDataLeft = {
    profilePic: "/images/trump_twitter_pfp.jpg",
    username: "Donald J. Trump",
    verifiedBadge: "/images/twitter-verified-badge.svg",
    handle: "RealDonaldTrump",
    date: tweet1.year,
    body: tweet1.text,
  };

  const tweetDataRight = {
    profilePic: "/images/trump_twitter_pfp.jpg",
    username: "Donald J. Trump",
    verifiedBadge: "/images/twitter-verified-badge.svg",
    handle: "RealDonaldTrump",
    date: tweet2.year,
    body: tweet2.text,
  };

  return (
    <div className="Game" id="mainScreen">
      <div className="main_div center">
        <div className="counter-container">
          <span className="counter-value">{counter}</span>
        </div>
        <div className="left">
          <Tweet
            tweetData={tweetDataLeft}
            handleClick={() => handleTweetClick(tweet1)}
          />
        </div>
        <div className="right">
          <Tweet
            tweetData={tweetDataRight}
            handleClick={() => handleTweetClick(tweet2)}
          />
        </div>
      </div>
    </div>
  );
};

export default TweetsGame;
