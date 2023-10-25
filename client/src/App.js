import React, { useState} from 'react'
import axios from 'axios'
import { Row, Container, Tab, Tabs } from 'react-materialize';
import { Search, Tweet, Loader, Title, Graph } from './components/index'
import 'materialize-css'
import './style.css'
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const App = () => {

  const [data, setData] = useState({ type: "start" })

  const callBack = async search => {
    setData({ type: "loading" })

    let info
    if (search.charAt(0) === '@')
      info = await axios.get(`/handle?username=${encodeURIComponent(search.substring(1))}`)
    else
      info = await axios.get(`/query?search=${encodeURIComponent(search)}`)

    setData(info.data)
  }

  const display = () => {

    if (data.error)
      return <h5 className="grey-text center-align">{data.error}...</h5>

    switch (data.type) {
      case 'start':
        return

      case 'loading':
        return <Loader />

      case 'handle':
        
        return (
          <div>
             <div className="center-block graph">
              <Graph graphData = {data.sentiment}/>
            </div>
            <div>
                {data.tweets.map(
                (tweet, i) =>
                (<div key={i}>
                  <Tweet author={data.author}
                    engagement={tweet.engagement}
                    tweet={tweet.tweet}
                    time={tweet.time}
                    permalink={tweet.permalink} />
                  <br />
                </div>))}
              </div>
          </div> )

      case 'query':
        return data.tweets.map(
          (tweet, i) =>
          (<div key={i}>
            <Tweet author={tweet.author}
              engagement={tweet.engagement}
              tweet={tweet.tweet}
              time={tweet.time}
              permalink={tweet.permalink} />
            <br />
          </div>))

       default:
            return

    }
  }

  return (
    <div>
      <Container>
        

        <div className="above"></div>

        <div className="center-align">
          <Title />
        </div >

        <Row className="center-align" >

          <Tabs className="z-depth-0">
            <Tab
              active
              options={{
                duration: 300,
                onShow: null,
                responsiveThreshold: Infinity,
                swipeable: false
              }}
              title="Search"
            >

              <Row />
              <div className="center-block search-bar ">
                <Search callBack={callBack} />
              </div>

             
              {display()}

            </Tab>
            <Tab
              options={{
                duration: 300,
                onShow: null,
                responsiveThreshold: Infinity,
                swipeable: false
              }}
              title="Info"
            >
              <Row />
              <Row />
             
              <div className="info">
                <strong>Title</strong>
                <Row />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae ultricies nunc. Vestibulum a nulla sit amet neque facilisis elementum. Phasellus et nisi sit amet orci blandit faucibus. Aliquam vitae dolor purus. Donec feugiat varius tempor. Cras molestie ac eros nec consequat. Nam posuere tortor id feugiat accumsan. Cras laoreet tempus aliquam. Sed odio sem, fringilla non mauris at, egestas varius justo. Praesent quis massa velit. Morbi vulputate purus eget quam rhoncus vestibulum. Sed purus nibh, feugiat hendrerit sem nec, rutrum cursus odio. Suspendisse venenatis ac ex sit amet varius.
                Aenean tincidunt nibh ac lacus semper, sed imperdiet velit efficitur. Curabit
              </div>

              <Row />
              <Row />
              <div className="info">
                <strong>Title</strong>
                <Row />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae ultricies nunc. Vestibulum a nulla sit amet neque facilisis elementum. Phasellus et nisi sit amet orci blandit faucibus. Aliquam vitae dolor purus. Donec feugiat varius tempor. Cras molestie ac eros nec consequat. Nam posuere tortor id feugiat accumsan. Cras laoreet tempus aliquam. Sed odio sem, fringilla non mauris at, egestas varius justo. Praesent quis massa velit. Morbi vulputate purus eget quam rhoncus vestibulum. Sed purus nibh, feugiat hendrerit sem nec, rutrum cursus odio. Suspendisse venenatis ac ex sit amet varius.
                Aenean tincidunt nibh ac lacus semper, sed imperdiet velit efficitur. Curabit
              </div>

              <Row />
              <Row />
              <div className="info">
                <strong>Title</strong>
                <Row />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae ultricies nunc. Vestibulum a nulla sit amet neque facilisis elementum. Phasellus et nisi sit amet orci blandit faucibus. Aliquam vitae dolor purus. Donec feugiat varius tempor. Cras molestie ac eros nec consequat. Nam posuere tortor id feugiat accumsan. Cras laoreet tempus aliquam. Sed odio sem, fringilla non mauris at, egestas varius justo. Praesent quis massa velit. Morbi vulputate purus eget quam rhoncus vestibulum. Sed purus nibh, feugiat hendrerit sem nec, rutrum cursus odio. Suspendisse venenatis ac ex sit amet varius.
                Aenean tincidunt nibh ac lacus semper, sed imperdiet velit efficitur. Curabit
              </div>

            </Tab>
          </Tabs>
        </Row >



      </Container>
    </div>

  )
}

export default App