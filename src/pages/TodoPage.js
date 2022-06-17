import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTodo } from '../context/TodoContext';
import { useCallback, useEffect, useRef } from 'react';
import Todos from '../components/Todos';
import FilterTodo from '../components/FilterTodo';
import SearchTodo from '../components/SearchTodo';
import { Helmet } from 'react-helmet';

const LOCAL_STORAGE_KEY = 'TodoApp-todos';

function TodoPage( {} ) {
	const { user, setUser } = useAuth();
	const { state, dispatch } = useTodo();
	
	const logOut = () => {
		setUser( false );
	}
	
	const inputRef = useRef();
	
	useEffect( () => {
		inputRef.current.focus();
	}, [] );
	
	const submitHandler = useCallback(
		( e ) => {
			e.preventDefault();
			dispatch( { type: 'ADD_TODO', todo: state.todo, userId: user.id } );
		}, [ state.todo, user.id ]
	)
	
	const updateTodo = useCallback( ( e ) => {
		dispatch( { type: 'UPDATE_TODO', value: e.target.value } );
	}, [] )
	
	const updateCompleted = useCallback( ( e ) => {
		dispatch( { type: 'UPDATE_COMPLETED', value: e.target.checked } );
	}, [] )
	
	useEffect( () => {
		const storageTodos = JSON.parse( localStorage.getItem( LOCAL_STORAGE_KEY ) );
		
		if ( storageTodos ) {
			dispatch( { type: 'LOAD_TODOS', todos: storageTodos } );
		}
	}, [] );
	
	useEffect( () => {
		localStorage.setItem( LOCAL_STORAGE_KEY, JSON.stringify( state.todos ) );
	}, [ state.todos ] );
	
	return (
		<>
			<Helmet>
				<title>👋Hi, {user.username}</title>
			</Helmet>
			
			<div className={'todo-page'}>
				<header className={'navbar'}>
					<p className={'logo'}>Todo <span>App</span></p>
					<SearchTodo/>
					<Link to={'/'}>
						<button className={'btn-primary'} onClick={logOut}>Log Out</button>
					</Link>
				</header>
				<div>
					<h1 className={'todo-page_title'}>👋Hi, <span>{user.username}</span></h1>
					<div>
						<form className={'home-page_form'} onSubmit={submitHandler}>
							<input type={'text'} placeholder={'Add todo...'} value={state.todo} onChange={updateTodo} ref={inputRef}/>
							<label>
								<input disabled={!state.todo || !user} type={'checkbox'} checked={state.checked}
								       onChange={updateCompleted}/>
								Completed
							</label>
							<button className={'btn-primary'} disabled={!state.todo || !user} type={'submit'}>Add Todo</button>
						</form>
					</div>
					<div className={'border'}/>
				</div>
				<FilterTodo/>
				<Todos/>
			</div>
		</>
	)
}

export default TodoPage;