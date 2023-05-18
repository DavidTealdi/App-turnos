import style from './Form.module.css'
import {useEffect, useState } from 'react'
import validate from '../validate'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'


// Varianble para guardar las opciones del select de hora viernes
const viernesHoras = [ {value: "Seleccione una hora"}, {value: '9:00hs'}, {value: '9:30hs'}, {value: '10:00hs'}, {value: '10:30hs'}, {value: '11:00hs'}, {value: '11:30hs'}, {value: '14:00hs'}, {value: '14:30hs'}, {value: '15:00hs'} ]

// Varianble para guardar las opciones del select de hora viernes
const sabadoHoras = [ {value: "Seleccione una hora"}, {value: '9:00hs'}, {value: '9:30hs'}, {value: '10:00hs'}, {value: '10:30hs'}, {value: '11:00hs'}, {value: '11:30hs'}, {value: '14:00hs'}, {value: '14:30hs'}, {value: '15:00hs'} ]

const Form = () => {

    const [input, setInput] = useState({  // Estado para almacenar los input del form
        name: '', 
        lastName: '',
        number: '',
    })
    
    const [horaViernes, setViernes] = useState("")  // Estado para almacenar la opcion de hora del viernes
    
    const [horaSabado, setSabado] = useState("") // Estado para almacenar la opcion de hora del sabado

    const [error, setError] = useState({})  // Estado para almacenar los errores de los input del formulario

    const [msg, setMsg] = useState(false) // Estado para manejar el mensaje de turno guardado

    const [turno, setTurnos] = useState(false) // Estado para manejar el mensaje de turno seleccionado


    // Funcion para almacenar los valores de los input en los estado y verificar error 
    const handleInput = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
        setError(validate({
            ...input,
            [event.target.name]: event.target.value
        }))
    }

    // Funcion para guardar la hora del viernes seleccionada
    const viernesOnchage = (event) => {
        setViernes(event.target.value)

        setSabado('')

        setTurnos(true) // ponemos el estado del mensaje de turno seleccionado en true
    }

    // Funcion para guardar la hora del sabado seleccionada
    const sabadoOnchage = (event) => {
        setSabado(event.target.value)

        setViernes('')

        setTurnos(true) // ponemos el estado del mensaje de turno seleccionado en true
    }


    // Objeto para guardar todos los estado 
    // y enviarlos al servidor si el turno es viernes
    let fromViernes = {
        name: input.name,
        lastName: input.lastName,
        number: input.number,
        dia: 'Viernes',
        hora: horaViernes 
    }

    // Objeto para guardar todos los estado 
    // y enviarlos al servidor si el turno es sabado
    let fromSabado = {
        name: input.name,
        lastName: input.lastName,
        number: input.number,
        dia: 'Sabado',
        hora: horaSabado
    }

    // Funcion para para mandar todo al servidor cuando se haga click en guardar
    const handleOnSubmit = async (event) => {

        event.preventDefault()

        if (horaViernes !== '') {

            try {
                
                const response = await axios.post('/turno', fromViernes)

                console.log(response.data)
                
                setMsg(true)

                setInput({
                    name: '',
                    lastName: '',
                    number: ''
                })

                if (horaViernes !== '') setViernes('')
                if (horaSabado !== '') setSabado('')

                setTimeout(() => setMsg(false), 8000)
            
            } catch (error) {
                
                console.log(error.response.data)    
            }
        }

        if (horaSabado !== '') {
            
            try {
                
                const response = await axios.post('/turno', fromSabado)

                console.log(response.data)
                
                setMsg(true)

                setInput({
                    name: '',
                    lastName: '',
                    number: ''
                })

                if (horaViernes !== '') setViernes('')
                if (horaSabado !== '') setSabado('')

                setTimeout(() => setMsg(false), 6000)
            
            } catch (error) {
                
                console.log(error.response.data)    
            }
        }
    }

    // Funcion para traer todos los turnos que hay en la DB y sacarlos del select 
    const horasFn = async () => {

        try {
        
            await axios.get('/getturnos')
            .then(response => {
                return response
            })
            .then(response => {

                let array =  response.data

                let hora_viernes = document.getElementById("horaViernes");
                let hora_sabado = document.getElementById("horaSabado");
                
        
                for (let i = 0; i < array.length; i++) {
                        
                    if  (array[i].dia === 'Viernes') {

                        for (let v = 0; v < hora_viernes.length; v++) {
                                
                            if (hora_viernes.options[v].value === array[i].hora) {
                                
                                hora_viernes.remove(v);
                            }
                        }
                            
                    }
                        
                    if  (response.data[i].dia === 'Sabado') {
                        
                        for (let s = 0; s < hora_sabado.length; s++) {
                                    
                            if  (hora_sabado.options[s].value === array[i].hora) {

                                hora_sabado.remove(s);
                            }
                        }
                    }
                }
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    // Cuando se monte el compenente llama a la funcion horasFn()
    useEffect(() => {
        horasFn()
    }, [])

    return (
        <section>

            <form  onSubmit={handleOnSubmit}>
                
                <label htmlFor="name"> Nombre </label>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Nombre" 
                    value={input.name} 
                    onChange={handleInput} 
                />
                {/* Mensaje de error */}
                {error.name && <p className={style.pError}>{error.name}</p>}  

                <label htmlFor="lastName"> Apellido </label>
                <input 
                    type="text" 
                    name="lastName" 
                    placeholder="Apellido" 
                    value={input.lastName} 
                    onChange={handleInput} 
                />
                {/* Mensaje de error */}
                {error.lastName && <p className={style.pError}>{error.lastName}</p>}

                <label htmlFor="number"> Numero de celular (opcional) </label>
                <input 
                    type="text" 
                    name="number" 
                    placeholder="Numero" 
                    value={input.number} 
                    onChange={handleInput} 
                />
                {/* Mensaje de error */}
                {/* {error.number && <p className={style.pError}>{error.number}</p>} */}

                <label htmlFor='hour'> Viernes </label>
                <select id='horaViernes' value={horaViernes} onChange={viernesOnchage}>
                    {
                        // Se mapea el array de objetos ViernesHoras y por cada valor se muestra una opcion
                        viernesHoras.map(hour => <option key={hour.value} value={hour.value}> {hour.value} </option>)
                    }
                </select>

                <label htmlFor='hour'> Sabado </label>
                <select id='horaSabado' value={horaSabado} onChange={sabadoOnchage}>
                    {
                        // Se mapea el array de objetos sabadoHoras y por cada valor se muestra una opcion
                        sabadoHoras.map(hour => <option key={hour.value} value={hour.value}> {hour.value} </option>)
                    }
                </select>
            
                {
                    // Muestra en pantalla con una etiqueta P el dia y hora seleccionado
                    turno === true 
                        
                        &&  

                    horaViernes 
                    
                        ? <p className={style.pDayHour}><span>Turno: </span>Viernes {horaViernes}</p>
                    
                    : horaSabado 
                        ? <p className={style.pDayHour}><span>Turno: </span>Sabado {horaSabado}</p> 
                    
                    : null
                }

                {
                    // Mesaje para avisar que el turno se guardo
                    msg === true &&
                        <div class="alert alert-success" role="alert">
                            Turno Guardado Correctamente *
                        </div>
                }
                                    
                <button disabled={!input.name || !input.lastName || error.name || error.lastName} > Guardar </button>
                
            </form>
            
        </section>
    )
}

export default Form