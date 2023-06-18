import './App.css';

import { Route, Routes } from 'react-router-dom';

import NavBar from './Componet/NavBar/NavBar';
import Title from './Componet/Title/Title';
import Form from './Componet/Form/Form';
import Login from './Componet/Login/Login';
import DataTable from './Componet/DataTable/DataTable';
import Footer from './Componet/FooterWeb/Footer';
import FormDelete from './Componet/EliminarTurno/FormDelete';

function App() { 

  return (
      <div className="App">
            
        <Routes>

          <Route path='/' element={[
            
            <NavBar/>,
            
            <Title/>, 
            
            <Form/>,
            
            <Footer/>,
          ]} 
          />

          <Route path='/delete' element={<FormDelete/>}/>

          <Route path='/login' element={<Login/>}/>

          <Route path='/crud' element={<DataTable/>}/>

        </Routes>
     
      </div>
  );
}

export default App;
