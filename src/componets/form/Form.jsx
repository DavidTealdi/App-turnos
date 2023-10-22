import {useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'

import {Formulario, ContenedorBotonCentrado, Boton, MensajeExito, MensajeError, SelectForm, LabelForm, DivHora, DiaHora, SpanTurno, Loading } from '../../elementos/Formularios' ;

import Input from '../input/Input';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faCheck } from '@fortawesome/free-solid-svg-icons';


const Form = () => {

	// Estado para almacenar el nombre, apellido y numero
    const [name, cambiarName] = useState({campo: '', valido: null}); 
	const [lastName, cambiarLastName] = useState({campo: '', valido: null});
	const [number, cambiarNumber] = useState({campo: '', valido: null});

	const [array, setArray] = useState([])

	const [viernesHoras, setViernesHoras] = useState([])
	const [sabadoHoras, setSabadoHoras] = useState([])
	
	// Estado para manejar el mensaje de existo
	const [formularioValido, cambiarFormularioValido] = useState(null);
	
	// Estado para guardar la hora seleccionada
	const [horaViernes, setViernes] = useState("") 
    const [horaSabado, setSabado] = useState("")

	// Estado para manejar el mensaje de turno seleccionado
	const [turno, setTurnos] = useState(false)

	// Estado para manejar el mensaje de turno existente
	const [turnoExistente, setTurnoExistente] = useState(false)

	// Estado para manejar el mensaje de loading
	const [loading, setLoading] = useState(false)

    const expresiones = {
		nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos.
		telefono: /^\d{7,14}$/ // 7 a 14 numeros.
	}

	// Objeto para guardar todos los estado 
    // y enviarlos al servidor si el turno es viernes
	let fromViernes = {
        name: name.campo,
        lastName: lastName.campo,
        number: number.campo,
        dia: 'Viernes', // Aqui
        hora: horaViernes 
    }

	// Objeto para guardar todos los estado 
    // y enviarlos al servidor si el turno es sabado
	let fromSabado = {
        name: name.campo,
        lastName: lastName.campo,
        number: number.campo,
        dia: 'Sabado', // Aqui
        hora: horaSabado
    }

	// Objeto para guardar el turno que seleccione el usuario
	// y enviarlo al servidor para ver si existe o no el turno
	let turnosEV = {
		dia: 'Viernes', // Aqui
        hora: horaViernes 
	}

	// Objeto para guardar el turno que seleccione el usuario
	// y enviarlo al servidor para ver si existe o no el turno
	let turnosES = {
		dia: 'Sabado', // Aqui
        hora: horaSabado
	}


	// Funcion para guardar la hora del viernes seleccionada
    const viernesOnchage = (event) => {
        setViernes(event.target.value)

		// Limpiamos el estado del sabado
        setSabado('')

		// ponemos el estado del mensaje de turno seleccionado en true
        setTurnos(true)
    }

    // Funcion para guardar la hora del sabado seleccionada
    const sabadoOnchage = (event) => {

        setSabado(event.target.value)

		// Limpiamos el estado del viernes
        setViernes('')

		// ponemos el estado del mensaje de turno seleccionado en true
        setTurnos(true)
    }

	// Funcion para para mandar todo al servidor cuando se haga click en guardar
    const onSubmit = async (e) => {
		e.preventDefault();

		// Verificamos si no hay errores en los input para poder enviarlos al servidor
		if(name.valido === 'true' && lastName.valido === 'true' && name.campo !== "" && lastName.campo !== "" && (horaViernes !== "" || horaSabado !== "")) {

			// Cuando se presiona al boton de guardar, lanzamos el loading
			setLoading(true)

			// Si el estado horaViernes no esta vacio, enviamos un turno dia viernes
			if (horaViernes !== '') {
				
				// trycatch que verifica si existe el turno o no
				try {
					
					// Peticion al backend para ver si existe o no el turno
					const turnosExistentes = await axios.post('/turnverification', turnosEV)
				
					// Si el turno exite lanzamos un error
					if (turnosExistentes.data.message === 'El turno no existe') {

						// trycatch para enviar el turno al backend
						try {
							
							// Envia el objeto fromViernes
							const response = await axios.post('/turno', fromViernes)
							

							// Limpiarmos todo los estado
							cambiarName({campo: '', valido: ''});
							cambiarLastName({campo: '', valido: null});
							cambiarNumber({campo: '', valido: null});
							if (horaViernes !== '') setViernes('')
							if (horaSabado !== '') setSabado('')

							// Ponemos el estado de loading en false para dejar de mostrarlo
							setLoading(false)

							// mostramos el mensaje de turno guardado
							cambiarFormularioValido(true);
							setTimeout(() => {
								cambiarFormularioValido(null);
							}, 6000);
						
						} catch (error) {
							// Si la peticion de axios salio mal mostramos el mensaje flotante
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
						// Ponemos el estado de loading en false para dejar de mostrarlo
						setLoading(false)

						// si el turno existe mostramos un mensaje de error
						setTurnoExistente(true)
						setTimeout(() => {
							setTurnoExistente(false);
						}, 4000);
					}
				
				} catch (error) {
					
					// Ponemos el estado de loading en false para dejar de mostrarlo
					setLoading(false)

					// Si la peticion de axios salio mal mostramos el mensaje flotante
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

		
			// Si el estado horaSabado no esta vacio, enviamos un turno dia sabado
			if (horaSabado !== '') {
				
				// trycatch que verifica si existe el turno o no
				try {
					
					// Peticion al backend para ver si existe o no el turno
					const turnosExistentes = await axios.post('/turnverification', turnosES)

					// Si el turno exite lanzamos un error
					if (turnosExistentes.data.message === 'El turno no existe') {
					
						// trycatch para enviar el turno al backend
						try {
							
							// Envia el objeto fromSabado
							const response = await axios.post('/turno', fromSabado)

							// Limpiarmos todo los estado
							cambiarName({campo: '', valido: ''});
							cambiarLastName({campo: '', valido: null});
							cambiarNumber({campo: '', valido: null});
							if (horaViernes !== '') setViernes('')
							if (horaSabado !== '') setSabado('')

							// Ponemos el estado de loading en false para dejar de mostrarlo
							setLoading(false)

							// mostramos el mensaje de turno guardado
							cambiarFormularioValido(true);
							setTimeout(() => {
								cambiarFormularioValido(null);
							}, 6000);	

						} catch (error) {
							// Si la peticion de axios salio mal mostramos el mensaje flotante
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
						// Ponemos el estado de loading en false para dejar de mostrarlo
						setLoading(false)
						
						// si el turno existe mostramos un mensaje de error
						setTurnoExistente(true)
						setTimeout(() => {
							setTurnoExistente(false);
						}, 4000);
					}

				} catch (error) {

					// Ponemos el estado de loading en false para dejar de mostrarlo
					setLoading(false)

					// Si la peticion de axios salio mal mostramos el mensaje flotante
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
			
		} else {
			// Si hay algun error en el formulario lanzamos el mensaje
			cambiarFormularioValido(false);
			setTimeout(() => {
				cambiarFormularioValido(null);
			}, 4000);
		}
	}

	const getHoras = async () => {
		try {
			axios.all([
			  axios.get('/horas/viernes'),
			  axios.get('/horas/sabado')
			]).then(
			  axios.spread((viernes, sabado) => {
				setViernesHoras(viernes.data)
				setSabadoHoras(sabado.data)
			  })
			);
		} catch (error) {
		console.log(error)
		}
	}

	// Funcion para traer todos los turnos que hay en la DB y sacarlos del select 
	const horasFn = async () => {

		await getHoras()

        try {
        
            const response =  await axios.get('/getturnos')

			let array =  response.data

			let hora_viernes = document.getElementById("horaViernes");
			let hora_sabado = document.getElementById("horaSabado");
			
	
			for (let i = 0; i < array.length; i++) {
					
				if  (array[i].dia === 'Viernes') { // AQUI

					for (let v = 0; v < hora_viernes.length; v++) {
							
						if (hora_viernes.options[v].value === array[i].hora) {
							
							hora_viernes.remove(v);
							// hora_viernes.options[v].disabled = true
						}
					}
							
				}
					
				if  (response.data[i].dia === 'Sabado') { // AQUI
					
					for (let s = 0; s < hora_sabado.length; s++) {
								
						if  (hora_sabado.options[s].value === array[i].hora) {

							hora_sabado.remove(s);
							// hora_sabado.options[s].disabled = true
						}
					}
				}
			}
        }
        catch (error) {
			console.log(error.message)
        }
    }

	// Cuando se monte el compenente llama a la funcion horasFn()
	useEffect(() => {
		
		
		horasFn()
		// setTimeout(() => {
		// }, 1000)
    }, [])

    return (
        <section>
			{/* Mensaje flotante si el servidor no responde */}
			<Toaster/>

            <Formulario action="" onSubmit={onSubmit}>
				{/* NOMBRE */}
				<Input
					estado={name}
					cambiarEstado={cambiarName}
					tipo="text"
					label="Nombre"
					placeholder="Nombre"
					name="name"
					leyendaError="El nombre debe contener de 3 a 20 letras"
					expresionRegular={expresiones.nombre}
				/>
				{/* APELLIDO */}
				<Input
					estado={lastName}
					cambiarEstado={cambiarLastName}
					tipo="text"
					label="Apellido"
					placeholder='Apellido'
					name="lastName"
					leyendaError="El apellido debe contener de 3 a 20 letras"
					expresionRegular={expresiones.nombre}
				/>
				{/* NUMERO */}
				{/* <Input
					estado={number}
					cambiarEstado={cambiarNumber}
					tipo="text"
					label="Numero de celular (Opcional)"
					placeholder="Numero"
					name="telefono"
					leyendaError="El telefono solo puede contener numeros y el maximo son 10 dígitos sin 0 ni 15."
					expresionRegular={expresiones.telefono}
				/> */}

				<LabelForm htmlFor='hour'> Viernes </LabelForm> 
				<SelectForm id='horaViernes' value={horaViernes} onChange={viernesOnchage} onClick={() => horasFn()} >
					<option defaultChecked>Selecione una hora</option>
					{                         
						// Se mapea el array de objetos ViernesHoras y por cada valor se muestra una opcion
						viernesHoras.map(hour => <option key={hour._id} value={hour.hora}> {hour.hora} </option>)
					}
				</SelectForm>

				<LabelForm htmlFor='hour'> Sabado </LabelForm>
				<SelectForm id='horaSabado' value={horaSabado} onChange={sabadoOnchage} onClick={() => horasFn()} >
					<option defaultChecked>Selecione una hora</option>
					{
						// Se mapea el array de objetos sabadoHoras y por cada valor se muestra una opcion
						sabadoHoras.map(hour => <option key={hour._id} value={hour.hora}> {hour.hora} </option>)
					}
				</SelectForm>

				<DivHora>
					{
						// Muestra en pantalla con una etiqueta P el dia y hora seleccionado
						turno === true &&  
						
							horaViernes 
																		// AQUI
								? <DiaHora><SpanTurno>Turno: </SpanTurno> Viernes {horaViernes}</DiaHora>
						
							: horaSabado 								// AQUI
								? <DiaHora><SpanTurno>Turno: </SpanTurno> Sabado {horaSabado}</DiaHora> 
						
							: null
					}
				</DivHora>

				{	
					// Loading mintras se guarda el turno
					loading === true && 
						<Loading>
							Guardando Turno...
						</Loading>
				}

				{
					// Si el turno existe mostramos un mensaje de error
					turnoExistente === true && 
						<MensajeError>
							<p>
								<FontAwesomeIcon icon={faExclamationTriangle}/>
								<b>Error:</b> El turno ya existe.
							</p>
						</MensajeError>
				}

				{	
					// Mensaje de error de formulario
					formularioValido === false && 
						<MensajeError>
							<p>
								<FontAwesomeIcon icon={faExclamationTriangle}/>
								<b>Error:</b> Formulario Incorrecto.
							</p>
						</MensajeError>
				}

				<ContenedorBotonCentrado>
					
					{	
						// Mensaje de turno guardado
						formularioValido === true && 
							<MensajeExito>
								<FontAwesomeIcon icon={faCheck} style={{marginRight: "8px"}} />
								¡Turno guardado exitosamente!
							</MensajeExito>
					}
					
					<Boton>Guardar</Boton>

				</ContenedorBotonCentrado>

			</Formulario>
            
        </section>
    )
}

export default Form