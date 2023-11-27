import { useState, useEffect } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';

import {Formulario, ContenedorBotonCentrado, Boton, MensajeExito, MensajeError, SelectForm, LabelForm, DivHora, DiaHora, SpanTurno, MensajeTurnoNoEncontrado, Loading } from '../../elementos/Formularios' ;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faCheck } from '@fortawesome/free-solid-svg-icons';

import Input from '../input/Input';


// Varianble para guardar las opciones del select de hora viernes
const Dia = [ {value: "Seleccione un dia"}, {value: 'Jueves'}, {value: 'Viernes'}]


const Form = () => {

	// Estados para almacenar el nombre y apellido
    const [name, cambiarName] = useState({campo: '', valido: null});
	const [lastName, cambiarLastName] = useState({campo: '', valido: null});

	// Estado para almacenar el dia seleccionado
    const [dia, setDia] = useState("") 

	// Estado para almacenar la hora seleccionada
    const [hora, setHora] = useState("")
	
	// Estado para mostrar el mensaje de turno eliminado
	const [formularioValido, cambiarFormularioValido] = useState(null);

	// Estado para manejar el mensaje de turno seleccionado
	const [turno, setTurnos] = useState(false)

	// Estado para mostrar mensaje de error si el turno no se encontro para su eliminacion
	const [turnoNoEncontrado, setTurnoNoEncontrado] = useState(false)

	// Estado para manejar el mensaje de loading
	const [loading, setLoading] = useState(false)

	const [horaV, setHoraV] = useState([])
	const [horaS, setHoraS] = useState([])

	const [boolianV, setBoolianV] = useState(false)
	const [boolianS, setBoolianS] = useState(false)

    const expresiones = {
		nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos.
		telefono: /^\d{7,10}$/ // 7 a 14 numeros.
	}

	// Funcion para guardar la hora del viernes seleccionada
    const diaOnchage = (event) => {
        
		if (event.target.value === 'Jueves') {
			setBoolianS(false)
			setDia(event.target.value)
			setBoolianV(true)
		}

		if (event.target.value === 'Viernes') {
			setBoolianV(false)
			setDia(event.target.value)
			setBoolianS(true)
		}
    }

    // Funcion para guardar la hora del sabado seleccionada
    const horaOnchage = (event) => {
        
        setHora(event.target.value)

		// Ponemos el estado del mensaje de turno seleccionado en true
        setTurnos(true)
    }

	// Objeto para guardar todos los estado 
    // y enviarlos al servidor si el turno es sabado
	let formDelete = {
        name: name.campo,
        lastName: lastName.campo,
        dia,
        hora
    }

	// Funcion para para mandar todo al servidor cuando se haga click en guardar
    const onSubmit = async (e) => {
		e.preventDefault();

		// Verificamos si no hay errores en los input para poder enviarlos al servidor
		if(name.valido === 'true' && lastName.valido === 'true' && dia !== "" && hora !== "") {

			// Poner el loading en true para mostrarlo
			setLoading(true)
				
            try {

                // Envia el objeto fromDelete para eliminar el turno
                const response = await axios.delete('/turnodelete', { data: formDelete })

				// Si la respuesta del backend es 0 significa que el turno no existe. Entramos en el cacth
                if (response.data.deletedCount === 0) throw new Error('Turno no encontrado')
                
				// Si el turno existe
                else {

                    // Limpiarmos todo los estado
                    cambiarName({campo: '', valido: ''});
                    cambiarLastName({campo: '', valido: null});
                    setDia('')
                    setHora('')

					// Dejamos de mostrar el turno a eliminar
                    setTurnos(false)

					// Dejamos de mostrar el loading
					setLoading(false)

					// Mostramos el mensaje de turno eliminado
					cambiarFormularioValido(true);
					setTimeout(() => {
						cambiarFormularioValido(null);
					}, 6000);
                }

            } catch (error) {
				// Dejamos de mostrar el loading
				setLoading(false)

				// Si el mensaje del back es "Turno no encontrado" mostramos el mensaje de error 
                if (error.message === 'Turno no encontrado') {
					setTurnoNoEncontrado(true)
					setTimeout(() => {
						setTurnoNoEncontrado(false)
					}, 4000);
				} 

				// Si el servidor no respode mostramos el mensaje flotante
				if (error.message === "Network Error") {
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
			// Si hay algun error con el formulario lanzamos el mensaje de error
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
				setHoraV(viernes.data)
				setHoraS(sabado.data)
			  })
			);
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getHoras()
	}, [])

    return (
        <section>
			
			{/* Mensaje flotante */}
			<Toaster/>

            <Formulario onSubmit={onSubmit}>

				{/* Nombre */}
				<Input
					estado={name}
					cambiarEstado={cambiarName}
					tipo="text"
					label="Nombre"
					placeholder="Nombre"
					name="name"
					leyendaError="El nombre debe contener de 3 a 20 digitos"
					expresionRegular={expresiones.nombre}
				/>
				{/* Apellido */}
				<Input
					estado={lastName}
					cambiarEstado={cambiarLastName}
					tipo="text"
					label="Apellido"
					placeholder='Apellido'
					name="lastName"
					leyendaError="El apellido debe contener de 3 a 20 digitos"
					expresionRegular={expresiones.nombre}
				/>

				<LabelForm htmlFor='Dia'> Dia </LabelForm>
				<SelectForm id='dia' value={dia} onChange={diaOnchage} >
					{                         
						// Se mapea el array de objetos ViernesHoras y por cada valor se muestra una opcion
						Dia.map(day => <option key={day.value} value={day.value}> {day.value} </option>)
					}
				</SelectForm>

				<LabelForm htmlFor='hora'> Hora </LabelForm>
				<SelectForm id='hora' value={hora} onChange={horaOnchage} >
					<option>Seleccione una hora</option>
					{
						boolianV === true 
							? 
								horaV?.map(hour => <option key={hour._id} value={hour.hora}> {hour.hora} </option>)
							: 
								boolianS === true 
									&& 
										horaS?.map(hour => <option key={hour._id} value={hour.hora}> {hour.hora} </option>)
					}
				</SelectForm>

				<DivHora>
					{
						// Muestra en pantalla con una etiqueta P el dia y hora seleccionado
						turno === true	&&  <DiaHora><SpanTurno>Turno: </SpanTurno>{name.campo} {lastName.campo}, {dia} {hora}</DiaHora>
					}
				</DivHora>

				{
					// Mensaje de turno no encontrado
					turnoNoEncontrado === true && 
						<MensajeTurnoNoEncontrado>
							<FontAwesomeIcon icon={faExclamationTriangle} style={{marginRight: "8px"}}/>
							<b>Error:</b> Turno no encontado
						</MensajeTurnoNoEncontrado>
				}

				{
					// Mensaje de formulario incorrecto
					formularioValido === false && 
						<MensajeError>
							<p>
								<FontAwesomeIcon icon={faExclamationTriangle}/>
								<b>Error:</b> Formulario Incorrecto.
							</p>
						</MensajeError>
				}

				{	
					// Loading mintras se elimina el turno
					loading === true && 
						<Loading>
							Eliminando Turno...
						</Loading>
				}

				<ContenedorBotonCentrado>
					
					{
						// Mensaje de turno eliminado
						formularioValido === true && 
							<MensajeExito>
								<FontAwesomeIcon icon={faCheck} style={{marginRight: "8px"}} />
								¡Turno eliminado exitosamente!
							</MensajeExito>
					}
					
					<Boton>Eliminar Turno</Boton>

				</ContenedorBotonCentrado>

			</Formulario>
			
        </section>
    )
}

export default Form