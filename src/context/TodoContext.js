import {createContext, useContext, useReducer, useState} from 'react';
import TodoReducer from '../reducers/TodoReducer';

const Context = createContext();

const Provider= ({children})=>{
	
	const [state, dispatch] = useReducer(TodoReducer,{
		todos:[],
		todo:'',
		completed:false,
		search:'',
		onlyMe:false,
		filterCompleted:false
	});
	
	const data = {
		state,
		dispatch
	}
	
	return(
		<Context.Provider value={data}>
			{children}
		</Context.Provider>
	)
}

export const useTodo = ()=> useContext(Context);
export default Provider;