import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';

function Home() {
	
	const { user, setUser, username, setUsername, password, setPassword, currentsUser } = useAuth();
	
	const saveUser = () => {
		setUser( currentsUser );
	}
	
	const inputRef = useRef();
	
	useEffect( () => {
		inputRef.current.focus();
	}, [] );
	
	return (
		<>
			<Helmet>
				<title>✌️Welcome TODO APP</title>
			</Helmet>
			<div className={'home-page'}>
				<h1 className={'home-page_title'}>✌️Welcome TODO <span>APP</span></h1>
				<div className={'home-page_form'}>
					<input type={'text'} placeholder={'Username'} value={username}
					       onChange={e => setUsername( e.target.value )} ref={inputRef}/>
					<input type={'password'} placeholder={'Password'} value={password}
					       onChange={e => setPassword( e.target.value )}/>
					<Link to={'/todopage'}>
						<button className={'btn-primary'} disabled={!currentsUser} onClick={saveUser}>login</button>
					</Link>
				</div>
			</div>
		</>
	)
}

export default Home;