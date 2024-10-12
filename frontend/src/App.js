import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive"; // Import react-responsive
import "./App.css"; // Make sure to add styles here or edit existing CSS file

const TweetsGame = () => {
  const [tweet1, setTweet1] = useState(null);
  const [tweet2, setTweet2] = useState(null);
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [borderColor, setBorderColor] = useState("blue");
  const [isShaking, setIsShaking] = useState(false);
  const [highlightedTweet, setHighlightedTweet] = useState(null);

  // Check if the screen width is mobile size
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

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

  const handleTweetClick = async (tweet) => {
    if (tweet.type === "fake") {
      setCounter(0);
      setBorderColor("red"); // Set border to red on wrong guess
      setIsShaking(true); // Enable shaking animation
      setHighlightedTweet(tweet.id); // Set highlighted tweet to red
  
      // Reset shaking and highlighted tweet after a short duration
      setTimeout(() => {
        setIsShaking(false);
        setHighlightedTweet(null); // Reset highlight after showing for a bit
      }, 1000); // Keep tweet highlighted for 1 second
    } else {
      const newCounter = counter + 1;
      setCounter(newCounter);
      setBorderColor("green"); // Change border to green on correct guess
      setHighlightedTweet(tweet.id); // Set highlighted tweet to green
  
      // Reset highlighted tweet after a short duration
      setTimeout(() => {
        setHighlightedTweet(null); // Reset highlight after showing for a bit
      }, 1000); // Keep tweet highlighted for 1 second
    }
  
    // Introduce a delay before fetching new tweets
    setTimeout(async () => {
      await fetchTweets(); // Fetch new tweets
    }, 300); // Delay of 0.3 seconds
  };
  

  // Fetch tweets on component mount
  useEffect(() => {
    fetchTweets();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const Tweet = ({ tweetData, handleClick }) => {
    const isHighlighted = highlightedTweet === tweetData.id; // Check if this tweet is highlighted

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
                <p>{formatTweetText(tweetData.body)}</p>
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

  const formatTweetText = (text) => {
    // Step 1: Replace | with ,
    let formattedText = text.replace(/\|/g, ",");

    // Step 2: Replace &amp with &
    formattedText = formattedText.replace(/&amp/g, "&");

    // Step 3: Format Twitter handles (underline and make blue)
    const handleRegex = /(^|[\s\W])@(\w+)(:)?/g; // Make the colon part of the captured groups
    formattedText = formattedText.replace(
      handleRegex,
      (match, before, handle, colon) =>
        `${before}<span style="color: #1DA1F2; margin-left: 0px; margin-right: 0px; font-style: normal;">@${handle}</span>${
          colon || ""
        }`
    );

    // Step 4: Replace \" with " and italicize text inside quotes
    const quoteRegex = /\\"(.*?)\\"/g;
    formattedText = formattedText.replace(
      quoteRegex,
      (match, p1) => `<i>"${p1}"</i>`
    );

    // Return as JSX with 'dangerouslySetInnerHTML'
    return <p dangerouslySetInnerHTML={{ __html: formattedText }} />;
  };

  // Use different layouts based on screen size
  return (
    <div className="Game" id="mainScreen">
      <div className="main_div center">
        <div
          className="counter-container"
          style={{
            border: `4px solid ${borderColor}`, // Adjust thickness here
            transition: "border-color 0.3s ease", // Smooth transition
          }}
        >
          <span className={`counter-value ${isShaking ? "shake" : ""}`}>
            {counter}
          </span>
        </div>

        {/* Conditional rendering based on screen size */}
        {isMobile ? (
          <div className="tweets-container-mobile">
            <Tweet
              tweetData={tweetDataLeft}
              handleClick={() => handleTweetClick(tweet1)}
            />
            <Tweet
              tweetData={tweetDataRight}
              handleClick={() => handleTweetClick(tweet2)}
            />
          </div>
        ) : (
          <div className="tweets-container-desktop">
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
        )}
      </div>
    </div>
  );
};

export default TweetsGame;
