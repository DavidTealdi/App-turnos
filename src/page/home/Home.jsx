import style from './Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { NavLink } from 'react-router-dom'

import Title from '../../componets/title/Title'
import Form from '../../componets/form/Form'
import Footer from '../../componets/footer/Footer'

const FormView = () => {
    return (
        <>
            <div className={style.div}>

                <NavLink to='/login'>
                    <button className={style.button}>Administrador</button>
                </NavLink>

                <NavLink to='/delete'>
                    <button className={style.buttonDelete}>Eliminar Turno</button>
                </NavLink>
                    
            </div>

            <Title/>

            <Form/>

            <Footer/>
        </>
    )
}


export default FormView