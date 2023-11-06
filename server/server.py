from flask import Flask, request
from dotenv import load_dotenv
from regex import R
load_dotenv()
import os
import nltk
from nltk.corpus import stopwords
nltk.download('stopwords')
nltk.download('wordnet')
stop_words = stopwords.words('english')
from urllib.parse import unquote
from textblob import TextBlob, Word
from profanity_check import predict_prob
import tweety
from tweety import Twitter
from datetime import datetime

app = Flask(__name__)

client = Twitter("session")


def preprocess_tweets(tweet):
    processed_tweet = tweet
    processed_tweet.replace('[^\w\s]', '')
    processed_tweet = " ".join(word for word in processed_tweet.split() if word not in stop_words)
    # processed_tweet = " ".join(Word(word).lemmatize() for word in processed_tweet.split())
    return(processed_tweet)

def get_date(item):
    return convert_to_datetime(item['date'])

def convert_to_datetime(date_string):
    return datetime.strptime(date_string, "%d %b, %Y")

@app.route("/handle")
def userTimeline():

    username = unquote(request.args.get('username'))
    username = username.replace("@", "")

    try:

        data = client.get_user_info(username)

    except tweety.exceptions_.UserNotFound:
        return {
            "type": "handle",
            "error": "There is no twitter account with this handle",
            "author": False,
            "tweets": False
        }

    author = {
        "type": "handle",
        "name": data.name,
        "username": data.username,
        "image": data.profile_image_url_https
    }

    if data.protected:
        return {
            "type": "handle",
            "error": "This account is private, Tweet-Safe can only scan public accounts",
            "author": author,
            "tweets": False
        }
    
    Alltweets = client.get_tweets(username, pages = 10, replies = False, wait_time = 5)

    tweets = []
    avgSentiment = 0
    avgPopularity = 0
    count = 0
    sentimentGraph = []

    for tweet in Alltweets:
        count +=1 
        ptweet = preprocess_tweets(tweet.text)
        sentiment = TextBlob(ptweet).sentiment[0]
        avgSentiment = (avgSentiment + sentiment)/ count
        popularity = tweet.likes
        avgPopularity = (avgPopularity+popularity)/count
        date = tweet.created_on.strftime("%d %b, %Y")
        sentimentGraph.append(
        {"sentiment": sentiment,
        # "popularity": popularity,
        "date": date})


        if predict_prob([tweet.text])[0] >= 0.5:
            tweetInfo = {
                "tweet": tweet.text,
                "id": tweet.id,
                "permalink": tweet.url,
                "time": tweet.created_on,
                "engagement": {
                    "replies": tweet.reply_counts,
                    "retweets": tweet.retweet_counts,
                    "likes": tweet.likes
                }
            }
            tweets.append(tweetInfo)

    if not tweets:
        return{"type": "handle",
            "error": 
            "This user has no tweets",
            "author": author,
            "tweets": False}

    sentimentGraph = sorted(sentimentGraph, key=get_date)

    return {"type": "handle",
            "error": False,
            "author": author,
            "tweets": tweets,
            "sentiment": sentimentGraph}


if __name__ == "__main__":
    app.run(debug=True)