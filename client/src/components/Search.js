import React, { useState, useEffect } from 'react'
import { Form, Field, Submit } from 'easy-react-form'
import 'materialize-css';
import { Row, Col, Button } from 'react-materialize';
import '../style.css'



const Input = ({ warning, error, ...rest }) => {
  return (
    <div className="input-field">
      <input placeholder="Enter @username, #hashtag, or a keyword" className={error} id="query" type="text" {...rest} />
      {/* <label htmlFor="query">Enter @username, #hashtag, or a keyword</label> */}
      <span className="red-text left-align helper-text" >{warning}</span>
    </div>)
}

const Search = (props) => {

  const [query, setQuery] = useState("");
  const [warning, setWarning] = useState("starting...");
  const [error, setError] = useState("");

  useEffect(() => {
    setError("")
    
    if (query.charAt(0) === '@') {
      if (query.length === 1)
        setWarning("Username must be beteween 0 & 15 characters long")
      else if (query.length > 16)
        setWarning("Username must be beteween 0 & 15 characters long")
      else if (!(/^[A-Za-z0-9_]*$/.test(query.substring(1))))
        setWarning("Only alphanumeric characters + underscore")
      else
        setWarning("")
    }
    else if (query.length > 500)
      setWarning("Queries must be below 500 characters")
    else
      setWarning("")
      
  }, [query]);


  const submitFunction = (e) => {
    if (query.length === 0){
      setWarning("Query can't be empty")
      setError("invalid") }
    else if (warning)
        setError("invalid")    
    else 
      props.callBack(query)

  }

  return (
    <div>
      <Form onSubmit={e => submitFunction(e)}>
        <Row>
          <Col className="l10 m11 s9 pull-left truncate">
            <Field
              value={query}
              warning={warning}
              error={error}
              onChange={e => setQuery(e.target.value)}
              name="search"
              component={Input} />
          </Col>
          <Col className="l2 m1 s3 ">
            <Submit formNoValidate 
            className="black z-depth-0 search-button" 
            component={Button}
            >
              Scan
            </Submit>
          </Col>
        </Row>
      </Form>
    </div>
  )
}


export default Search