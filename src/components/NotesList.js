import React from 'react';
// import styled from "styled-components";
import NotesDetails from './NotesDetails';
import * as mt from '@material-ui/core';
// import {useGlobalContext} from '../context'

const NotesList = ({ Notes, fetchNotes}) => {
	// Need to include body={body} but if I do that it will make all body's empty.

	return (
		<mt.Container>
			<mt.Grid container spacing={3}>
			{Notes.map((Note) => ( 
				<mt.Grid item key={Note.id} xs={12} sm={6} lg={4}>
				 <NotesDetails key={Note.id} {...Note} fetchNotes={fetchNotes}> </NotesDetails>
				</mt.Grid>
			))}
			</mt.Grid>
		</mt.Container>	
	);
};

export default NotesList;