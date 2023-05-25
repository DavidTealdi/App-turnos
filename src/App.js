import './App.css';
import { Route, Routes } from 'react-router-dom';
import ButtonLogin from './Componet/Button-login-header/ButtonLogin';
import Title from './Componet/Title/Title';
import Form from './Componet/Form/Form';
import Login from './Componet/Login/Login';
import DataTable from './Componet/DataTable/DataTable';
import Footer from './Componet/FooterWeb/Footer';

function App() {

  return (
      <div className="App">
            
        <Routes>

          <Route path='/' element={[
            
            <ButtonLogin/>,
            
            <Title/>, 
            
            <Form/>,
            
            <Footer/>
          ]} 
          />

          <Route path='/login' element={<Login/>}/>

          <Route path='/crud' element={<DataTable/>}/>

        </Routes>
     
      </div>
  );
}

export default App;
