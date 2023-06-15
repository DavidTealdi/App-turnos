import style from './DateTable.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const DataTable = () => {

    // Estado donde guardamos los turnos que el servidor mando
    const [viernes, setViernes] = useState([])
    const [sabado, setSabado] = useState([])

    

    // Peticion Delete para eliminar los turnos
    const peticionDelete = async (id) => {
        await axios.delete(`/turno/${id}`)
        .then(response => {
            fetchData()
        })
    }

    // Peticion Get al servidor para traer todos los turnos
    const fetchData = async () => {
        try {
          axios.all([
            axios.get('/turno/viernes'),
            axios.get('/turno/sabado')
          ]).then(
            axios.spread((viernes, sabado) => {
              setViernes(viernes.data)
              setSabado(sabado.data)
            })
          );
        } catch (error) {
            alert("404 Not Found")
        }
    };

    // useEffect los usamos para saber cuando hacer la peticion get al servidor. 
    // En este caso se hace cuando el componente se monta
    useEffect(() => {
        fetchData();
    }, []);

    const cerrarSesion = () => {
        cookies.remove('id', {path: '/'})
        cookies.remove('user', {path: '/'})
        cookies.remove('password', {path: '/'})

        window.location.href="/"
    }

    useEffect(() => {
        if (!cookies.get('user')) {
            window.location.href='/'
        }
    }) 

    return (
        <div>

            
            <button onClick={cerrarSesion} className={style.button}>Cerrar Sesion</button>
            
            <h1 className={style.title_table}>Turnos Disponibles</h1>
            
            <div className={style.divTable}>

                {/* viernes */}

                <h3>Viernes</h3>

                <table className='table table-striped .table-responsive'>
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Numero</th>
                            <th scope="col">Dia</th>
                            <th scope="col">Hora</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // Mapeamos todos los turnos y los mostramos en la tabla
                            viernes.map((element) => (
                                <tr key={element._id}>
                                    <td>{element.name}</td>
                                    <td>{element.lastName}</td>
                                    <td>{element.number}</td>
                                    <td>{element.dia}</td>
                                    <td>{element.hora}</td>
                                    <td><button onClick={() => peticionDelete(element._id)} className='btn btn-dark'>Eliminar</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                {/* sabado */}
                <h3>Sabado</h3>

                <table className='table table-striped .table-responsive'>
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Numero</th>
                            <th scope="col">Dia</th>
                            <th scope="col">Hora</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // Mapeamos todos los turnos y los mostramos en la tabla
                            sabado.map((element) => (
                                <tr key={element._id}>
                                    <td>{element.name}</td>
                                    <td>{element.lastName}</td>
                                    <td>{element.number}</td>
                                    <td>{element.dia}</td>
                                    <td>{element.hora}</td>
                                    <td><button onClick={() => peticionDelete(element._id)} className='btn btn-dark'>Eliminar</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table> 

            </div>

        </div>
    )
}

export default DataTable