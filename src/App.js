import './App.css';

import { Route, Routes } from 'react-router-dom';

import Home from './view/home/Home'
import DeleteTurns from './view/deleteTurns/DeleteTurns'
import Login from './view/login/Login'
import TableTurns from './view/tableTurns/TableTurns'

function App() { 

  return (
      <div className="App">
            
        <Routes>

          <Route path='/' element={<Home/>}/>

          <Route path='delete' element={<DeleteTurns/>}/>

          <Route path='/login' element={<Login/>}/>

          <Route path='/crud' element={<TableTurns/>}/>

        </Routes>
     
      </div>
  );
}

export default App;
