import React, { useState } from 'react'
import Typewriter from 'typewriter-effect';

const Title = () => {
    const [stop, setStop] = useState(false)

    const display = () =>{
        if(stop){
            return (<div><h1 className="black-text">Tweet-Safe</h1> 
            <body className='black-text'> or is it X-Safe? </body> </div>)
        }
        else{
            return (
        < div >
        <h1 className="black-text">
        <Typewriter
        onInit={(typewriter) => {
            typewriter.changeDelay(80).changeDeleteSpeed(40)
                .typeString('Social Media')
                .pauseFor(1000)
                .deleteAll()
                .pauseFor(1000)
                .typeString("Safe Socials")
                .pauseFor(1000)
                .deleteAll()
                .pauseFor(1000)
                .typeString("Tweet Safe")
                .pauseFor(2530)
                .callFunction(() => {
                    setStop(true)
                })
                .start()
            // .stop();
        }}
    />


        </h1>
    </div >
            )
        }
    }
    return (
        <div>
            {display()}
        </div>
        
    )
}

export default Title