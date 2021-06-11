import React from 'react';
import { useState } from 'react';
import styled from "styled-components";
import { AiTwotoneDelete, AiOutlineEdit } from 'react-icons/ai';
import * as mt from '@material-ui/core';

import api from '../axiosConfig';

const NoteCard = styled.div`
	background-color: #27B7F5;
	overflow: hidden;
 	padding: 0 0 30px;
  margin: 20px auto 0;
 	width: 500px;
  font-family: Quicksand, arial, sans-serif;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
`

export const CardHeading = styled.div`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  padding: 20px 0px 20px;
  background-color: #1d6482;
`

export const CardBody = styled.div`
	padding: 20px 30px 30px;
	height: 400px;
`

const TextField = styled.textarea`
  width: 350px;
  height: 400px;
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

export const Button = styled.button`
	position: relative;
	left: 5%;
	margin-right: 20px;
`

// Float just flips (swaps) the elements

const NotesDetails = ({id, date, time, body, fetchNotes}) => {
	const [isModified, setIsModified] = useState(false);
	const [dateModified, setDateModified] = useState(new Date().toLocaleDateString("en-US"));
  const [timeModified, setTimeModified] = useState(new Date().toLocaleTimeString("en-US", {timeStyle: 'short'}));


	const deleteNote = async(id) => {
    await api.delete(`/${id}`);
    fetchNotes();
  }


  // This updates the body of the note
  const updateNote = async(id) => {
    await api.patch(`/${id}`, {
    isModified: true,
    body: body,
    dateModified: dateModified,
    timeModified: timeModified
    }); 
    fetchNotes();
    // Save button
  }

  const onUpdateClick = (id, e) => {
  	// console.log('Hello world' + id)
  	setIsModified(true);
  }
   
/*

<span> { dateModified } { timeModified }</span> 

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

				{ isModified ? <CardBody> 

					<TextField 
	      	value={body} 
	      	onChange={(e) => setBody(e.target.value)}
	      	/>
	      	</CardBody> : 

	      	<CardBody> {body} </CardBody>

	      }			    	

		</mt.Card>	
	);
}

export default NotesDetails;