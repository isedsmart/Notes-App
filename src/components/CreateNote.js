import React from 'react';
import styled from "styled-components";
import { useState } from "react";
import {useGlobalContext} from '../context'

import api from '../axiosConfig';

// Error: Warning: Can't perform a React state update on an unmounted component

const Wrapper = styled.div`
  text-align: center;
  margin-top: 20px;
`

const SubTitle = styled.h2`
	font-family: "Arial", Sans-serif;
	font-size: 24px;
`

const TextField = styled.textarea`
  width: 400px;
  height: 100px;
  maxHeight: 300px;
  resize: none; 
  padding: 10px 10px;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: #f8f8f8;
  margin-bottom: 10px;
  font-family: "Arial", Sans-serif;
`

const Button = styled.button`
  border: none;
  outline: none;
  padding: 10px 20px;
  margin-bottom: 20px;
  background: #27B7F5;
  border-radius: 10px;
  font-size: 20px;
  font-weight: bold;
  box-shadow: 0 2px 2px 0 #0000003b;
  cursor: pointer;
  font-family: "Arial", Sans-serif;
`

const CreateNote = ({fetchNotes, handleClick}) => {
	let totalChars = 840; // This appears here and in the Note Details component
	const { body, setBody } = useGlobalContext(); 
	
	const modified = false;
	const date = new Date().toLocaleDateString("en-US");
	const time = new Date().toLocaleTimeString("en-US", {timeStyle: 'short'});

	// These are when the note was created, but I could have separate properties for when they were last modified that can be posted at the top of the note but below the date and time.

	const [charLeft, setCharLeft] = useState(totalChars);

	const handleSubmit = async() => {
		await api.post('/', 
			{body: body,
			 date: date,
			 time: time,
			 isModified: modified,
			 modifiedDate: '',
			 modifiedTime: '',
			})
		fetchNotes();
		setBody('');
	}

	const textFieldChange = (e) => {
		setBody(e.target.value);
		setCharLeft(totalChars - e.target.value.length);
	}

	// An onClick event function to handle all of the onClick events
	const createButtonClick = () => { 
		handleSubmit(); // This submits the info via post request
		handleClick(); // This makes the toggled "Create Button" disappear
	}

	return (
		<Wrapper>
			<SubTitle> Create a New Note </SubTitle>
			<p> Characters left: {charLeft} </p>
      <TextField 
      	maxLength={totalChars} 
      	required
      	value={body} 
      	onChange={(e) => textFieldChange(e)}
      	placeholder="Enter your note here"/>
      <br/>
      <Button onClick={createButtonClick}> Create </Button>
		</Wrapper> 
    );
}

export default CreateNote;