import { useTodo } from '../context/TodoContext';
import { useCallback } from 'react';

function SearchTodo(){
	
	const { state, dispatch } = useTodo();
	
	const searchHandle = useCallback( e => {
		dispatch( {
			type: 'UPDATE_SEARCH',
			value: e.target.value,
		} );
	}, [] );
	
	return(
		<div>
			<input style={{marginBottom:0}} type={'text'} placeholder={'Search...'} value={state.search} onChange={searchHandle}/>
		</div>
	)
}

export default SearchTodo;