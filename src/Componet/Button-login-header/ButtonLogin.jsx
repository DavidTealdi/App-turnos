import style from './ButtonLogin.module.css'
import { NavLink } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

const ButtonLogin = () => {
    return (
        <div className={style.div}>
            
            <NavLink to='/login'>
                <button className={style.button}>Administrador</button>
            </NavLink>
                        
        </div>
    )
}

export default ButtonLogin