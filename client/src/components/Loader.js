import React from 'react'
import HashLoader from 'react-spinners/HashLoader'

const Loader = () => {
  return (
    <div className="loading">
        <br/>
        <br/>
        <HashLoader color={"#2196f3"} loading={true} size={25} />
    </div>)
    
}

export default Loader