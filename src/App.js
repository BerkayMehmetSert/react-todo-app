import './App.css';
import TodoPage from './pages/TodoPage';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import TodoContext from './context/TodoContext';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <div>
      <AuthContext>
        <TodoContext>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="todopage" element={<TodoPage/>}/>
            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
        </TodoContext>
      </AuthContext>
    </div>
  )
}

export default App;
