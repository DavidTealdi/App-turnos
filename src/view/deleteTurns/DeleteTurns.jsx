import style from './DeleteTurns.module.css'

import { NavLink } from 'react-router-dom';
import DeleteTurns from '../../componets/formDelete/FormDelete'

const DeleteTurnsView = () => {
    return (
        <>
            <div className={style.divNavbar}>
				<NavLink to='/'>
					<button className={style.buttonVolverFormDelete}>Volver</button>
				</NavLink>
			</div>

            <h1 className={style.h2TitleFormDelete}>Eliminar turno</h1>

            <DeleteTurns/>
        </>
    )
}

export default DeleteTurnsView