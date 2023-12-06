import style from './DateTable.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import toast, { Toaster } from 'react-hot-toast';

import { Loading } from '../../elementos/Formularios' ;

const cookies = new Cookies()

const DataTable = () => {

    // Estado donde guardamos los turnos que el servidor mando
    const [viernes, setViernes] = useState([])
    const [sabado, setSabado] = useState([])

    // Estados para guardar las horas de los input
    const [horaViernes, setHoraViernes] = useState('')
    const [horaSabdo, setHoraSabado] = useState('')

    // Estado para almacenar las horas que hay en la DB y mostrarlas
    const [getViernes, setGetViernes] = useState([])
    const [getSabado, setGetSabado] = useState([])

    // Estado para manejar el mensaje de loading
	const [loadingV, setLoadingV] = useState(false)
    const [loadingS, setLoadingS] = useState(false)

    
    // Funcion para guardar la hora del viernes
    const viernesOnchage = (event) => {
        setHoraViernes(event.target.value)
    }

    // Funcion para guardar la hora del sabado
    const sabadoOnchage = (event) => {
        setHoraSabado(event.target.value)
    }

    // Funcion para guardar la hora del viernes en la DB
    const guardarViernes = async () => {

        let hora = {
            hora: horaViernes
        }
        
        if(horaViernes !== '') {
            
            setLoadingV(true)
            
            try {
                
                await axios.post(`/horas/viernes`, hora)

                setLoadingV(false)
    
                setHoraViernes('')

                peticionGetViernes()
                
            } catch (error) {
                setLoadingV(false)
                toast.error('Error: el servidor no responde', {
                    duration: 10000,
                    position: 'top-center',
                    style: {
                        fontSize: "18px",
                        background: "#c50000",
                        color: "#fff"
                    }
                })
            }
        
        } else {
            toast.error('Error: llena el input', {
                duration: 5000,
                position: 'top-center',
                style: {
                    fontSize: "18px",
                    background: "#c50000",
                    color: "#fff"
                }
            })
        }
    }

    // Funcion para guardar la hora del sabado en la DB
    const guardarSabado = async () => {

        let hora = {
            hora: horaSabdo
        }
        
        if (horaSabdo !== '') {
            
            setLoadingS(true)
        
            try {
                
                const response = await axios.post(`/horas/sabado`, hora)

                setLoadingS(false)

                setHoraSabado('')

                peticionGetSabado()
                
            } catch (error) {
                setLoadingS(false)
                toast.error('Error: el servidor no responde', {
                    duration: 10000,
                    position: 'top-center',
                    style: {
                        fontSize: "18px",
                        background: "#c50000",
                        color: "#fff"
                    }
                })
            }
        
        } else {
            toast.error('Error: llena el input', {
                duration: 5000,
                position: 'top-center',
                style: {
                    fontSize: "18px",
                    background: "#c50000",
                    color: "#fff"
                }
            })
        }
    }

    // Traer las horas viernes de la DB
    const peticionGetViernes = async () => {
        try {
            
            const {data} = await axios.get(`/horas/viernes`)

            setGetViernes(data)

        } catch (error) {
            toast.error('Error: el servidor no responde', {
                duration: 10000,
                position: 'top-center',
                style: {
                    fontSize: "18px",
                    background: "#c50000",
                    color: "#fff"
                }
            })
        }
    }

    // Traer las horas sabado de la DB
    const peticionGetSabado = async () => {
        try {
            
            const {data} = await axios.get(`/horas/sabado`)

            setGetSabado(data)

        } catch (error) {
            toast.error('Error: el servidor no responde', {
                duration: 10000,
                position: 'top-center',
                style: {
                    fontSize: "18px",
                    background: "#c50000",
                    color: "#fff"
                }
            })
        }
    }

    // Eliminar las horas viernes de la DB 
    const peticionDeleteViernes = async (id) => {
        
        try {
            
            const response = await axios.delete(`/horas/viernes/${id}`)

            peticionGetViernes()
            
        } catch (error) {
            toast.error('Error: el servidor no responde', {
                duration: 10000,
                position: 'top-center',
                style: {
                    fontSize: "18px",
                    background: "#c50000",
                    color: "#fff"
                }
            })
        }
    }
    
    // Eliminar las horas sabado de la DB 
    const peticionDeleteSabado = async (id) => {
        
        try {
            
            const response = await axios.delete(`/horas/sabado/${id}`)

            peticionGetSabado()
            
        } catch (error) {
            toast.error('Error: el servidor no responde', {
                duration: 10000,
                position: 'top-center',
                style: {
                    fontSize: "18px",
                    background: "#c50000",
                    color: "#fff"
                }
            })
        }
    }

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
            toast.error('Error: el servidor no responde', {
                duration: 10000,
                position: 'top-center',
                style: {
                  background: "#212121",
                  color: "#fff"
                }
            })
        }
    };

    // useEffect los usamos para saber cuando hacer la peticion get al servidor. 
    // En este caso se hace cuando el componente se monta
    useEffect(() => {
        fetchData();
        peticionGetViernes()
        peticionGetSabado()
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

            <Toaster/>

            <div className={style.divNavBar}>
                <button onClick={cerrarSesion} className={style.button}>Cerrar Sesion</button>
            </div>

            <div className={style.divTitle}>
                <h3 className={style.title_table}>Guardar horas</h3>
            </div>

            <div className={style.divInputViernes}>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Horas Viernes (ejemplo 09:00hs)" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={viernesOnchage} value={horaViernes}/>
                    <button class="btn btn-dark" onClick={() => guardarViernes()}>Guardar</button>
                </div>
            </div>

            <div className={style.divLoading}>
                {	
                    // Loading mintras se guarda el turno
                    loadingV === true && 
                    <Loading>
                        Guardando...
                    </Loading>
                }
            </div>

            <div className={style.divInputViernes}>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Horas Sabado (ejemplo 09:00hs)" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={sabadoOnchage} value={horaSabdo}/>
                    <div class="input-group-append">
                        <button class="btn btn-dark" onClick={() => guardarSabado()}>Guardar</button>
                    </div>
                </div>
            </div>
            
            <div className={style.divLoading}>
                {	
                    // Loading mintras se guarda el turno
                    loadingS === true && 
                    <Loading>
                        Guardando...
                    </Loading>
                }
            </div>
            
            <div className={style.divTitle}>
                <h3 className={style.title_table}>Horas Actuales</h3>
            </div>

            <div className={style.divTitle}>
                <h5>Hora Viernes</h5>
            </div>
            <table className={style.table}>
                <thead>
                    <tr>
                        <th className={style.th}>Hora</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        getViernes.map((element) => (
                            <tr>
                                <td className={style.td}>{element.hora}</td>
                                <td className={style.td}><button onClick={() => peticionDeleteViernes(element._id)} className='btn btn-dark'>Eliminar</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            
            <div className={style.divTitle}>
                <h5>Hora Sabado</h5>
            </div>
            <table className={style.table}>
                <thead>
                    <tr>
                        <th className={style.th}>Hora</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        getSabado.map((element) => (
                            <tr>
                                <td className={style.td}>{element.hora}</td>
                                <td className={style.td}><button onClick={() => peticionDeleteSabado(element._id)} className='btn btn-dark'>Eliminar</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>


            
            <div className={style.divTitle}>
                <h3 className={style.title_table}>Turnos Disponibles</h3>
            </div>

            <div className={style.divTable}>

                <div className={style.divTitle}>
                    <h4>Viernes</h4>
                </div>

                <table className={style.table}>
                    <thead>
                        <tr>
                            <th className={style.th}>Nombre</th>
                            <th className={style.th}>Apellido</th>
                            <th className={style.th}>Numero</th>
                            <th className={style.th}>Dia</th>
                            <th className={style.th}>Hora</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // Mapeamos todos los turnos y los mostramos en la tabla
                            viernes.map((element) => (
                                <tr key={element._id}>
                                    <td className={style.td}>{element.name}</td>
                                    <td className={style.td}>{element.lastName}</td>
                                    <td className={style.td}>{element.number}</td>
                                    <td className={style.td}>{element.dia}</td>
                                    <td className={style.td}>{element.hora}</td>
                                    <td className={style.td}><button onClick={() => peticionDelete(element._id)} className='btn btn-dark'>Eliminar</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                
                <div className={style.divTitle}>
                    <h4>Sabado</h4>
                </div>

                <table className={style.table}>
                    <thead>
                        <tr>
                            <th className={style.th}>Nombre</th>
                            <th className={style.th}>Apellido</th>
                            <th className={style.th}>Numero</th>
                            <th className={style.th}>Dia</th>
                            <th className={style.th}>Hora</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // Mapeamos todos los turnos y los mostramos en la tabla
                            sabado.map((element) => (
                                <tr key={element._id}>
                                    <td className={style.td}>{element.name}</td>
                                    <td className={style.td}>{element.lastName}</td>
                                    <td className={style.td}>{element.number}</td>
                                    <td className={style.td}>{element.dia}</td>
                                    <td className={style.td}>{element.hora}</td>
                                    <td className={style.td}><button onClick={() => peticionDelete(element._id)} className='btn btn-dark'>Eliminar</button></td>
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