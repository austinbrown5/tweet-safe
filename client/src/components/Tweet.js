import React from 'react'
import TweetCard from 'react-tweet-card'
import '../style.css'
import { Container} from 'react-materialize'

const Tweet = ({author, engagement, tweet, time, permalink}) => {
    return (
    <div>
        <Container className = "tweet">
            <TweetCard className = "tweetCard"
                author={{
                    name: author.name,
                    username: author.username,
                    image: author.image
                }}
                // engagement={{
                //     replies: parseInt(engagement.replies),
                //     retweets: parseInt(engagement.retweets),
                //     likes: parseInt(engagement.likes),
                // }}
                clickableProfileLink = {true}
                tweet={tweet}
                time={time}
                source="Social Scout"
                permalink={permalink}
                showEngagement = {false}
                fitInsideContainer = {true}
                theme = "light"
            />
        </Container>
    </div>
  )
}

export default Tweet