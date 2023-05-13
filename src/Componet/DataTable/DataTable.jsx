import style from './DateTable.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'

// URL del servidor
const URL = "http://localhost:3001/turno"
const URL_VIERNES = "http://localhost:3001/turno/viernes"
const URL_SABADO = "http://localhost:3001/turno/sabado"

const cookies = new Cookies()

const DataTable = () => {

    // Estado donde guardamos los turnos que el servidor mando
    const [viernes, setViernes] = useState([])
    const [sabado, setSabado] = useState([])

    

    // Peticion Delete para eliminar los turnos
    const peticionDelete = async (id) => {
        await axios.delete(`${URL}/${id}`)
        .then(response => {
            fetchData()
            // console.log(response)
        })
    }

    // Peticion Get al servidor para traer todos los turnos
    const fetchData = async () => {
        try {
          axios.all([
            axios.get(URL_VIERNES),
            axios.get(URL_SABADO)
          ]).then(
            axios.spread((viernes, sabado) => {
              console.log(viernes)
              setViernes(viernes.data)
              setSabado(sabado.data)
            })
          );
        } catch (error) {
          console.log(error);
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
                            <th scope="col">#</th>
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
                                <tr key={element.id}>
                                    <th scope="row">{element.id}</th>
                                    <td>{element.name}</td>
                                    <td>{element.lastName}</td>
                                    <td>{element.number}</td>
                                    <td>{element.dia}</td>
                                    <td>{element.hora}</td>
                                    <td><button onClick={() => peticionDelete(element.id)} className='btn btn-dark'>Eliminar</button></td>
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
                            <th scope="col">#</th>
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
                                <tr key={element.id}>
                                    <th scope="row">{element.id}</th>
                                    <td>{element.name}</td>
                                    <td>{element.lastName}</td>
                                    <td>{element.number}</td>
                                    <td>{element.dia}</td>
                                    <td>{element.hora}</td>
                                    <td><button onClick={() => peticionDelete(element.id)} className='btn btn-dark'>Eliminar</button></td>
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