
// THIS IS NOT IN USE SINCE I COULDN'T GET IT WORKING WITH BODY AND SETBODY!

import React, { useState, useContext } from 'react'

const AppContext = React.createContext(); 

const AppProvider = ({children}) => { 
	const [body, setBody] = useState('');

	return (
		<AppContext.Provider value={{ 
			body,
			setBody
		}}>
		{children} </AppContext.Provider>
	)
}

export {AppContext, AppProvider}

export const useGlobalContext = () => {
	return (
		useContext(AppContext)
	)
}