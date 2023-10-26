# import twint
# import nest_asyncio

# con = twint.Config()
# con.Username = "KingJames"
# con.Limit = 20

# nest_asyncio.apply()
# twint.run.Search(con)

# import csv
# from Scweet.scweet import scrape
# data = scrape(since="2021-10-01", until="2021-10-05", from_account = "KingJames",interval=1, headless=True, display_type="Latest", resume=False, filter_replies=False, proximity=False)

# with open(data, newline='') as csvfile:
#     spamreader = csv.reader(csvfile, delimiter=' ', quotechar='|')
#     for row in spamreader:
#         print(', '.join(row))

# from typing import Optional

# import requests


# def do_work(data: dict) -> None:
#     # do actual work with data
#     print(data)


# def do_request(tweet_id: str | int) -> Optional[dict]:
#     response = requests.get(url=f"https://api.vxtwitter.com/Twitter/status/{tweet_id}")
#     if not response.ok:
#         print("Couldn't get tweet.")
#         return
#     try:
#         do_work(response.json())
#     except requests.JSONDecodeError:
#         print("Couldn't decode response.")
#         return


# if __name__ == "__main__":
#     do_request(1716406115536351523)

import tweety
from tweety import Twitter
  
app = Twitter("session")

# all_tweets = app.get_tweets("elonmusk")
# tweet_ids = []
# tweet_texts = []
# for tweet in all_tweets:
#     tweet_id = tweet.id
#     tweet_text = tweet.text
#     tweet_ids.append(tweet_id)
#     tweet_texts.append(tweet_text)
#     print(tweet_text)


# checking if i can get User object from username
# user = app.get_user_info("elonmusk")
# print(user)

# user = app.get_user_info("elonmusk")
# print(user)


# # what happens if username is invalid 
# user = app.get_user_info("ahshdutjdklmned")
# print(user)

# try:
#     user = app.get_user_info("ahshdutjdklmned")
#     print(user)
#     # User was found, continue with processing
# except tweety.exceptions_.UserNotFound as e:
#     print(f"The User Account wasn't Found. Error code: {e.error_code}, Error name: {e.error_name}")

def userTimeline():
    username = "@elonmusk"

    username = username.replace("@", "")

    try:
        data = app.get_user_info(username)
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
    
    Alltweets = app.get_tweets(username, pages = 5, replies = False, wait_time = 2)

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
        {"sentiment": popularity,
        # "popularity": popularity,
        "date": date})


        if predict([tweet.text])[0] == 1:
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

    sentimentGraph.reverse()

    return {"type": "handle",
            "error": False,
            "author": author,
            "tweets": tweets,
            "sentiment": sentimentGraph}




if __name__ == "__main__":
    author = userTimeline()
    print(author)

# for handle

# 1. check if user is valid
# 2. 