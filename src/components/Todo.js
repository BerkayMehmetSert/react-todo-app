import { useTodo } from '../context/TodoContext';
import { useAuth } from '../context/AuthContext';
import users from '../data/users';
import { useCallback } from 'react';
import classNames from 'classnames';

function Todo({todo, index}) {
	
	const { state, dispatch } = useTodo();
	const { user } = useAuth();
	
	const todoUser= users.find(user=> user.id === todo.userId);
	
	const deleteTodo = useCallback( index => {
		dispatch( {
			type: 'DELETE_TODO',
			index,
		} );
	}, [] );
	
	const toggleTodo = useCallback( index => {
		dispatch( {
			type: 'TOGGLE_TODO',
			index,
		} );
	}, [] );
	
	const updateTodoItem = useCallback( ( index, value ) => {
		dispatch( {
			type: 'UPDATE_TODO_ITEM',
			index,
			value,
		} );
	}, [] );
	
	return(
		<>
			<li>
				<div className={'action'}>
					{todo.userId === user.id && !todo.completed && (
						<input style={{width:500,marginBottom:0}} className={'update'} onChange={e => updateTodoItem(index, e.target.value)} type="text" value={todo.title}/>)}
					
					{((todo.userId === user.id && todo.completed) || todo.userId !== user.id) &&
					<p className={classNames({ 'todo-completed-item': true, 'completed': todo.completed})}>
						{todo.title}
					</p>}
					{todo.userId === user.id && (
						<div className={'action-btn'}>
							<button className={'delete-btn'} onClick={() => deleteTodo(index)}>Delete</button>
							<button className={'check-btn'}  onClick={() => toggleTodo(index)}>
								{todo.completed ? 'Uncompleted' : 'completed'}
							</button>
						</div>
					)}
				</div>
				{todoUser.id !== user.id && (
					<div className={'copyright'}>
						<b >{todoUser.username}</b>
					</div>
				)}
			</li>
		</>
	)
}
export default Todo;