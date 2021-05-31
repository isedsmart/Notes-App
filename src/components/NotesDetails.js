import React from 'react';
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

export const Button = styled.button`
	position: relative;
	left: 5%;
	margin-right: 20px;
`

// Float just flips (swaps) the elements

const NotesDetails = ({id, date, time, body, fetchNotes}) => {

	const deleteNote = async(id) => {
    await api.delete(`/${id}`);
    fetchNotes();
  }

  const updateNote = async(id) => {
  	// console.log(id)
  	// console.log(body)
    await api.patch(`/${id}`, {body: body});
    fetchNotes();
  }

/*

<mt.Grid container>
	<mt.Grid item xs={12} sm={6} md={3}> 
		<mt.Paper>1 </mt.Paper>
	</mt.Grid>
	<mt.Grid item xs={12} sm={6} md={3}> 
		<mt.Paper>2 </mt.Paper>
	</mt.Grid>
	<mt.Grid item xs={12} sm={6} md={3}> 
		<mt.Paper>3 </mt.Paper>
	</mt.Grid>
	<mt.Grid item xs={12} sm={6} md={3}> 
		<mt.Paper>4 </mt.Paper>
	</mt.Grid>
</mt.Grid>

*/

	return (
		<mt.Card>
			<CardHeading>
				{date} {time}

				<Button onClick={() => updateNote(id)}>
					<AiOutlineEdit size={20}/> 
				</Button>

				<Button onClick={() => deleteNote(id)}> 
					<AiTwotoneDelete size={20}/>
				</Button> 
		
			</CardHeading>
				<CardBody> {body} </CardBody>
		</mt.Card>	
	);
}

export default NotesDetails;