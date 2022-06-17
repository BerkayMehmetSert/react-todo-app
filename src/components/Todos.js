import { useMemo } from 'react';
import Todo from './Todo';
import { useTodo } from '../context/TodoContext';
import { useAuth } from '../context/AuthContext';

function Todos() {
	
	const { state, dispatch } = useTodo();
	const { user } = useAuth();
	
	const filteredTodos = useMemo(
		() =>
			state.todos.filter( todo => {
				return (
					todo.title
						.toLocaleLowerCase( 'TR' )
						.includes( state.search.toLocaleLowerCase( 'TR' ) )
					&&
					(
						state.onlyMe && user ? (todo.userId === user.id) : true
					)
				);
			} ),
		[ state.todos, state.search, state.onlyMe, user]
	);
	
	const filtered = useMemo( () => {
		switch (state.filterCompleted) {
			case 'completed':
				return filteredTodos.filter( todo => todo.completed );
			case 'uncompleted':
				return filteredTodos.filter( todo => !todo.completed );
			default:
				return filteredTodos;
			
		}
		
	} , [ state.todos, state.search, state.onlyMe, user,  state.filterCompleted ] );
	
	return (
		<>
			{filtered.length > 0 && (
				<ul>
					{filtered.map( ( todo, index ) => <Todo key={index} index={index} todo={todo}/> )}
				</ul>
			) || (
				<div className={'empty-todo'}>
					<p className={'empty-todo-text'}>
						✏️ You haven't added any todos yet!
					</p>
				</div>
			)}
		</>
	)
}

export default Todos;