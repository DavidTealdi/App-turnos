import style from './NavBar.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    return (
        <div className={style.div}>

            <NavLink to='/login'>
                <button className={style.button}>Administrador</button>
            </NavLink>

            <NavLink to='/delete'>
                <button className={style.buttonDelete}>Eliminar Turno</button>
            </NavLink>
                    
        </div>
    )
}

export default NavBar