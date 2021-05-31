import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
// import * as mt from 'material-ui/core';
// json-server --watch db.json --port 8000

import CreateNote from './components/CreateNote';
import AddNoteFooter from './components/AddNoteFooter';
import NotesList from './components/NotesList';
// import NotesDetails from './components/NotesDetails';
import api from './axiosConfig';

import styled from "styled-components";

const Title = styled.h1`
  text-align: center;
  font-family: "Arial", Sans-serif;
  font-size: 44px;
  margin-bottom: 30px;
`

const SubTitle = styled.h2`
  font-family: "Arial", Sans-serif;
  font-size: 18px;
  text-align: center;
`

const TopDivider = styled.div`
  position: relative;
  width: 100%;
  height: 5px;
  top: 8.5%;
  margin-bottom: 20px;
  background: #F5276F;
`

function App() {
  const [clicked, setclicked] = useState(false);
  const [notes, setNotes] = useState([]);

  // Use try, catch blocks for async functions (helpful last notes at 8:30)
  const fetchNotes = async() => {
    let data = await api.get('/')
    .then(({data}) =>
      data);
      data.reverse();
      setNotes(data);
    }

  /*
  const sortByDate = () => {
    let newNotes = notes.reverse()
    setNotes(notes.sort((a,b) => a.date > b.date));
  }

  const toggleSortDate = () => {
    sortByDate();
  }
  */

  useEffect(() => {
    fetchNotes();
  }, [])

  const handleClick = () => { // Toggles the clicked functionality
    setclicked(setclicked => !setclicked);
  }

  if(notes.length === 0) {
    return (
      <main>
        <Title> Welcome to My Notes </Title>
        <TopDivider/>
        <SubTitle> You Have No Notes :( </SubTitle>
        { clicked && <CreateNote fetchNotes={fetchNotes} handleClick={handleClick}/> }
        <AddNoteFooter handleClick={handleClick} />
      </main>
    );
  }
  return (
    <main>
      <Title> Welcome to My Notes </Title>
      <TopDivider/>
      { clicked && <CreateNote fetchNotes={fetchNotes} handleClick={handleClick}/> }
      <AddNoteFooter handleClick={handleClick} />
      <NotesList Notes={notes} fetchNotes={fetchNotes}/>
    </main>
  );
}

export default App;
