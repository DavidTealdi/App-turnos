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

	const [loadingHorasV, setLoadingHorasV] = useState(null)
	const [loadingHorasS, setLoadingHorasS] = useState(null)
	const [mensajeLoadingHorasV, setMensajeLoadingHorasV] = useState(null) 
	const [mensajeLoadingHorasS, setMensajeLoadingHorasS] = useState(null) 

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
        dia: 'Jueves', // Aqui
        hora: horaViernes 
    }

	// Objeto para guardar todos los estado 
    // y enviarlos al servidor si el turno es sabado
	let fromSabado = {
        name: name.campo,
        lastName: lastName.campo,
        number: number.campo,
        dia: 'Viernes', // Aqui
        hora: horaSabado
    }

	// Objeto para guardar el turno que seleccione el usuario
	// y enviarlo al servidor para ver si existe o no el turno
	let turnosEV = {
		dia: 'Jueves', // Aqui
        hora: horaViernes 
	}

	// Objeto para guardar el turno que seleccione el usuario
	// y enviarlo al servidor para ver si existe o no el turno
	let turnosES = {
		dia: 'Viernes', // Aqui
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


	useEffect(() => {
	
		const viernes = async () => {

			
			try {
				
				setLoadingHorasV(true)
				
				const res = await axios.get('/horas/viernes')
				
				let horasV = res.data

				const response = await axios.get('/getturnos')

				let arrayV =  response.data


				const horasDisponiblesV = horasV.filter(obj1 => {
					return !arrayV.some(obj2 => obj2.hora === obj1.hora && obj2.dia === 'Jueves'); // Aqui
				});

				setViernesHoras(horasDisponiblesV)

				setLoadingHorasV(false)

			} catch (error) {
				setLoadingHorasV(null)
				setMensajeLoadingHorasV(true)
			}
		}

		viernes()

	}, [])

	useEffect(() => {

		const sabado = async () => {

			try {

				setLoadingHorasS(true)
				
				const res = await axios.get('/horas/sabado')

				let horasS = res.data

				const response = await axios.get('/getturnos')

				let arrayS =  response.data

				const horasDisponiblesS = horasS.filter(obj1 => {
					return !arrayS.some(obj2 => obj2.hora === obj1.hora && obj2.dia === 'Viernes'); // Aqui
				});

				setSabadoHoras(horasDisponiblesS)

				setLoadingHorasS(false)
				

			} catch (error) {
				setLoadingHorasS(null)
				setMensajeLoadingHorasS(true)

			}
		}

		sabado()

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
				<Input
					estado={number}
					cambiarEstado={cambiarNumber}
					tipo="text"
					label="Numero de celular (Opcional)"
					placeholder="Numero"
					name="telefono"
					leyendaError="El telefono solo puede contener numeros y el maximo son 10 dígitos sin 0 ni 15."
					expresionRegular={expresiones.telefono}
				/>


				<LabelForm htmlFor='hour'> Jueves </LabelForm> 
				{
					loadingHorasV === true 
						? 
							<Loading>Cargando horas...</Loading>
						: 
							loadingHorasV === false 
								&&
									<SelectForm id='horaViernes' value={horaViernes} onChange={viernesOnchage} >
										<option defaultChecked>Selecione una hora</option>
										{                         
											// Se mapea el array de objetos ViernesHoras y por cada valor se muestra una opcion
											viernesHoras.map(hour => <option key={hour._id} value={hour.hora}> {hour.hora} </option>)
										}
									</SelectForm>
				}

				{
					// Si no se pueden cargar las horas mostramos un mensaje de error
					mensajeLoadingHorasV === true && 
						<MensajeError>
							<p>
								<FontAwesomeIcon icon={faExclamationTriangle}/>
								<b>Error:</b> no se pueden cargar las horas.
							</p>
						</MensajeError>
				}
				 
 
				<LabelForm htmlFor='hour'> Viernes </LabelForm>
				{
					loadingHorasS === true 
						? 
							<Loading>Cargando horas...</Loading>
						: 
							loadingHorasV === false 
								&&
									<SelectForm id='horaSabado' value={horaSabado} onChange={sabadoOnchage} >
										<option defaultChecked>Selecione una hora</option>
										{
											// Se mapea el array de objetos sabadoHoras y por cada valor se muestra una opcion
											sabadoHoras.map(hour => <option key={hour._id} value={hour.hora}> {hour.hora} </option>)
										}
									</SelectForm>
				}
 
				{
					// Si no se pueden cargar las horas mostramos un mensaje de error
					mensajeLoadingHorasS === true && 
						<MensajeError>
							<p>
								<FontAwesomeIcon icon={faExclamationTriangle}/>
								<b>Error:</b> no se pueden cargar las horas.
							</p>
						</MensajeError>
				}
				
 
				<DivHora>
					{
						// Muestra en pantalla con una etiqueta P el dia y hora seleccionado
						turno === true &&  
						
							horaViernes 
																		// AQUI
								? <DiaHora><SpanTurno>Turno: </SpanTurno> Jueves {horaViernes}</DiaHora>
						
							: horaSabado 								// AQUI
								? <DiaHora><SpanTurno>Turno: </SpanTurno> Viernes {horaSabado}</DiaHora> 
						
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