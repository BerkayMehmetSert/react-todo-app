import { useTodo } from '../context/TodoContext';
import { useCallback } from 'react';
import classNames from "classnames";

function FilterTodo() {
	
	const { state, dispatch } = useTodo();
	
	const updateOnlyMe = useCallback( () => {
		dispatch( {
			type: 'UPDATE_ONLY_ME',
		} );
	}, [] );
	
	const updateFilterCompleted = useCallback( value => {
		dispatch( {
			type: 'UPDATE_FILTER_COMPLETED',
			value,
		} );
	}, [] );
	
	return (
		<div className={'filter-btns'}>
			<button className={classNames({
				'btn': true,
				'true': state.onlyMe,
				'false': !state.onlyMe,
			})} onClick={updateOnlyMe}>
				Only Me Todos
			</button>
			
			<button className={classNames({
				'btn': true,
				'true': state.filterCompleted === 'completed',
				'false': state.filterCompleted !== 'completed',
			})} onClick={() => updateFilterCompleted( state.filterCompleted === 'completed' ? false : 'completed' )}>
				Completed Todos
			</button>
			
			<button className={classNames({
				'btn': true,
				'true': state.filterCompleted === 'uncompleted',
				'false': state.filterCompleted !== 'uncompleted',
			})} onClick={() => updateFilterCompleted(state.filterCompleted === 'uncompleted' ? false : 'uncompleted')}>
				Uncompleted Todos
			</button>
		</div>
	)
}

export default FilterTodo;