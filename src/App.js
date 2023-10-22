import './App.css';

import { Route, Routes } from 'react-router-dom';

import Home from './page/home/Home'
import DeleteTurns from './page/deleteTurns/DeleteTurns'
import Login from './page/login/Login'
import TableTurns from './page/tableTurns/TableTurns'

function App() { 

  return (
      <div className="App">
            
        <Routes>   

          <Route path='/' element={<Home/>} />

          <Route path='delete' element={<DeleteTurns/>}/>

          <Route path='/login' element={<Login/>}/>

          <Route path='/crud' element={<TableTurns/>}/>

        </Routes>
     
      </div>
  );
}

export default App;
