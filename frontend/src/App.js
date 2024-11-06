import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import "./App.css";

const TweetsGame = () => {
  const [tweet1, setTweet1] = useState(null);
  const [tweet2, setTweet2] = useState(null);
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [borderColor, setBorderColor] = useState("blue");
  const [isShaking, setIsShaking] = useState(false);
  const [highlightedTweet, setHighlightedTweet] = useState(null);
  const [guessResult, setGuessResult] = useState(""); // New state for feedback

  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  useEffect(() => {
    document.title = "Trump Tweet Guesser";
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://trumptweetguesser.westus.cloudapp.azure.com/random_tweets_view/", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      setTweet1({
        type: data.tweets[0].tweet_type,
        text: data.tweets[0].tweet_content,
        id: data.tweets[0].id,
      });

      setTweet2({
        type: data.tweets[1].tweet_type,
        text: data.tweets[1].tweet_content,
        id: data.tweets[1].id,
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching tweets:", error);
      setLoading(false);
      setTweet1({}); // Set as empty objects to allow fallback content
      setTweet2({});
    }
  };

  const handleTweetClick = async (tweet) => {
    if (tweet.type === "fake") {
      setCounter(0);
      setBorderColor("red");
      setGuessResult("Wrong!"); // Display "Wrong!"
      setIsShaking(true);
      setHighlightedTweet(tweet.id);

      setTimeout(() => {
        setIsShaking(false);
        setHighlightedTweet(null);
        setGuessResult(""); // Clear message
      }, 1000);
    } else {
      const newCounter = counter + 1;
      setCounter(newCounter);
      setBorderColor("green");
      setGuessResult("Correct!"); // Display "Correct!"
      setHighlightedTweet(tweet.id);

      setTimeout(() => {
        setHighlightedTweet(null);
        setGuessResult("");
      }, 1000);
    }

    setTimeout(async () => {
      await fetchTweets();
    }, 300);
  };

  if (loading) {
    return <div>Loading tweets...</div>;
  }

  if (!tweet1 || !tweet2) {
    return <div>Oops! Could not load tweets. Please try again later.</div>;
  }

  const Tweet = ({ tweetData, handleClick }) => {
    const isHighlighted = highlightedTweet === tweetData?.id;

    return (
      <div
        onClick={handleClick}
        className={`button unselectable flip-card ${
          isHighlighted
            ? tweetData.type === "fake"
              ? "highlight-red"
              : "highlight-green"
            : ""
        }`}
      >
        <div className="tweet-wrap flip-card-inner hover-outline">
          <div className="flip-card-front">
            <div className="tweet-header">
              <img
                src={tweetData?.profilePic || "/images/trump_twitter_pfp.jpg"}
                alt="Profile"
                className="avatar"
              />
              <div className="tweet-header-info">
                {"Donald J. Trump"}
                <object
                  data={"images/twitter-verified-badge.svg"}
                  width="15"
                  height="15"
                  style={{ verticalAlign: "middle", paddingLeft: "5px" }}
                ></object>
                <span>@{"realDonaldTrump"}</span>
                <p>
                  {tweetData?.text
                    ? formatTweetText(tweetData.text)
                    : "Tweet unavailable"}
                </p>
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
    body: tweet1.text,
  };

  const tweetDataRight = {
    profilePic: "/images/trump_twitter_pfp.jpg",
    username: "Donald J. Trump",
    verifiedBadge: "/images/twitter-verified-badge.svg",
    handle: "RealDonaldTrump",
    body: tweet2.text,
  };

  const formatTweetText = (text) => {
    let formattedText = text.replace(/\|/g, ",");
    formattedText = formattedText.replace(/&amp/g, "&");
    const handleRegex = /(^|[\s\W])@(\w+)(:)?/g;
    formattedText = formattedText.replace(
      handleRegex,
      (match, before, handle, colon) =>
        `${before}<span style="color: #1DA1F2; margin-left: 0px; margin-right: 0px; font-style: normal;">@${handle}</span>${
          colon || ""
        }`
    );
    const quoteRegex = /\\"(.*?)\\"/g;
    formattedText = formattedText.replace(
      quoteRegex,
      (match, p1) => `<i>"${p1}"</i>`
    );

    return <p dangerouslySetInnerHTML={{ __html: formattedText }} />;
  };

  return (
    <div className="Game" id="mainScreen">
      <div className="main_div center">
        <div
          className="counter-container"
          style={{
            border: `4px solid ${borderColor}`,
            transition: "border-color 0.3s ease",
          }}
        >
          <span className={`counter-value ${isShaking ? "shake" : ""}`}>
            {counter}
          </span>
        </div>
        <div className="info-icon-container">
          <span className="info-icon">i</span>
          <div className="info-tooltip">
            <p>Guess the Donald Trump tweet!</p>
            <p>
              Created by Connor and Pablo. Githubs:{" "}
              <a
                href="https://github.com/Connor-H-Bot"
                target="_blank"
                rel="noopener noreferrer"
              >
                Connor
              </a>{" "}
              and{" "}
              <a
                href="https://github.com/ThespDev"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pablo
              </a>
              .
            </p>
            <p>
              Tweets have been verified.{" "}
              <a
                href="https://github.com/Connor-H-Bot/trump_tweets"
                target="_blank"
                rel="noopener noreferrer"
              >
                Database here
              </a>
              .
            </p>
          </div>
        </div>

        {isMobile ? (
          <div className="tweets-container-mobile">
            <Tweet
              tweetData={tweet1}
              handleClick={() => handleTweetClick(tweet1)}
            />
            <Tweet
              tweetData={tweet2}
              handleClick={() => handleTweetClick(tweet2)}
            />
          </div>
        ) : (
          <div className="tweets-container-desktop">
            <div className="left">
              <Tweet
                tweetData={tweet1}
                handleClick={() => handleTweetClick(tweet1)}
              />
            </div>
            <div className="right">
              <Tweet
                tweetData={tweet2}
                handleClick={() => handleTweetClick(tweet2)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TweetsGame;
