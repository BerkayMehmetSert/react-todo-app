import { createContext, useContext, useEffect, useState } from 'react';
import users from '../data/users.json';

const Context = createContext();

const Provider = ( { children } ) => {
	
	const [ user, setUser ] = useState( localStorage.getItem( 'TodoAPP-users' ) ? JSON.parse( localStorage.getItem( 'TodoAPP-users' ) ) : false )
	
	const [ username, setUsername ] = useState( '' );
	const [ password, setPassword ] = useState( '' );
	
	const currentsUser = users.find( user => user.username === username && user.password === password );
	
	useEffect( () => {
		localStorage.setItem( 'TodoAPP-users', JSON.stringify( user ) )
	}, [ user ] );
	
	const data = {
		user,
		setUser,
		username,
		setUsername,
		password,
		setPassword,
		currentsUser
	}
	
	return (
		<Context.Provider value={data}>
			{children}
		</Context.Provider>
	)
}

export const useAuth = () => useContext( Context );

export default Provider;

