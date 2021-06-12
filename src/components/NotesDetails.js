import React from 'react';
import { useState, useEffect } from 'react';
import styled from "styled-components";
import { AiTwotoneDelete, AiOutlineEdit } from 'react-icons/ai';
import * as mt from '@material-ui/core';

import api from '../axiosConfig';
// import {useGlobalContext} from '../context';

// const NoteCard = styled.div`
// 	background-color: #27B7F5;
// 	overflow: hidden;
//  	padding: 0 0 30px;
//   margin: 20px auto 0;
//  	width: 500px;
//   font-family: Quicksand, arial, sans-serif;
//   box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
//   border-radius: 5px;
// `

const CardHeading = styled.div`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  padding: 20px 0px 20px;
  background-color: #1d6482;
`

const CardBody = styled.div`
	padding: 20px 20px 30px;
	height: 400px;
`

const TextField = styled.textarea`
  width: 330px;
  height: 380px;
  maxHeight: 300px;
  resize: none; 
  padding: 10px 10px;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: #f8f8f8;
  margin-bottom: 10px;
  box-sizing: border-box;
  font-family: "Arial", Sans-serif;
`

const Button = styled.button`
	position: relative;
	left: 5%;
	margin-right: 20px;
`

// Float just flips (swaps) the elements

const NotesDetails = ({id, isModified, date, time, body, modifiedDate, modifiedTime, setBody, fetchNotes}) => {
	// const { body, setBody } = useGlobalContext(); 
	let totalChars = 840; // This appears here and in the Create Note component

	const [isUpdate, setIsUpdate] = useState(false);

	// const dateModified = new Date().toLocaleDateString("en-US");
  // const timeModified = new Date().toLocaleTimeString("en-US", {timeStyle: 'short'});
  // These two states are updated every single time I reload the page... It should only happen when I update the Note

	const deleteNote = async(id) => {
    await api.delete(`/${id}`);
    fetchNotes();
  }


  // This updates the body of the note
  const updateNote = async(id) => {
    await api.patch(`/${id}`, {
    isModified: true,
    body: body,
    modifiedDate: new Date().toLocaleDateString("en-US"),
		modifiedTime: new Date().toLocaleTimeString("en-US", {timeStyle: 'short'})
    });
    // console.log(body);
    setIsUpdate(!isUpdate); 
    fetchNotes();
  }

  const onUpdateClick = (id) => {
  	setIsUpdate(!isUpdate);
  }
   
/*

*/
	return (
		<mt.Card>
			<CardHeading>
				{date} {time}

				<Button onClick={() => onUpdateClick(id)}>
					<AiOutlineEdit size={20}/> 
				</Button>

				<Button onClick={() => deleteNote(id)}> 
					<AiTwotoneDelete size={20}/>
				</Button> 
			</CardHeading>
				{ isModified && <span> Modified: { modifiedDate } { modifiedTime }</span> }
				{ isUpdate ? <CardBody> 

					<TextField 
					maxLength={totalChars} 
	      	value={body} 
	      	onChange={(e) => setBody(e.target.value)}
	      	/>
	      	<button onClick={() => updateNote(id)}> Done </button>
	      	</CardBody> : 

	      	<CardBody> {body} </CardBody>

	      }			    	

		</mt.Card>	
	);
}

export default NotesDetails;