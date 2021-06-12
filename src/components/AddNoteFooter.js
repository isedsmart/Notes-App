// import { useState } from 'react';
import styled from "styled-components";

// All of these CSS combinations puts it at the bottom of the page.

const Footer = styled.div`
	position: absolute;
	font-family: "Arial", Sans-serif;
	position: fixed;
	text-align: center;
	bottom: 0;
	width: 100%;
	padding: 10px;
	margin-top: 5px;
	background-color: #27B7F5;
`

const AddNoteButton = styled.button`
	border: none;
 	outline: none;
 	font-size: 20px;
	font-weight: bold;
 	background-color: #27B7F5;
`

const AddNoteFooter = ({ handleClick }) => {
	return (
		<Footer> 
			<AddNoteButton onClick={handleClick}> Add a New Note </AddNoteButton>
		</Footer>
	)
}

export default AddNoteFooter;