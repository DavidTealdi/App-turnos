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

            <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div class="col-md-4 d-flex align-items-center">
                    <span class="mb-3 mb-md-0 text-body-secondary">&copy; 2023 Mediopelo.barbershop</span>
                </div>
            </footer>
        </>
    )
}

export default DeleteTurnsView