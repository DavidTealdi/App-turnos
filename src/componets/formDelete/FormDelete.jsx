import { useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';

import {Formulario, ContenedorBotonCentrado, Boton, MensajeExito, MensajeError, SelectForm, LabelForm, DivHora, DiaHora, SpanTurno, MensajeTurnoNoEncontrado } from '../../elementos/Formularios' ;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import Input from '../input/Input';


// Varianble para guardar las opciones del select de hora viernes
const Dia = [ {value: "Seleccione un dia"}, {value: 'Viernes'}, {value: 'Sabado'}, ]

// Varianble para guardar las opciones del select de hora viernes
const Horas = [ {value: "Seleccione una hora"}, {value: '08:40hs'}, {value: '09:00hs'}, {value: '09:20hs'}, {value: '09:30hs'}, {value: '09:40hs'}, {value: '10:00hs'}, {value: '10:20hs'}, {value: '10:30hs'}, {value: '10:40hs'}, {value: '11:00hs'}, {value: '11:20hs'}, {value: '11:30hs'}, {value: '11:40hs'}, {value: '12:00hs'}, {value: '12:20hs'}, {value: '16:00hs'}, {value: '16:20hs'}, {value: '16:40hs'}, {value: '17:00hs'}, {value: '17:30hs'}, {value: '17:40hs'}, {value: '18:00hs'}, {value: '18:20hs'}, {value: '18:30hs'}, {value: '18:40hs'}, {value: '19:00hs'}, {value: '19:20hs'}, {value: '19:40hs'}, {value: '20:00hs'}]


const Form = () => {
    const [name, cambiarName] = useState({campo: '', valido: null}); // Estado para almacenar el nombre
	const [lastName, cambiarLastName] = useState({campo: '', valido: null}); // Estado para almacenar el apellido

    const [dia, setDia] = useState("") 
    const [hora, setHora] = useState("")
	
	const [formularioValido, cambiarFormularioValido] = useState(null);
	
	const [turno, setTurnos] = useState(false) // Estado para manejar el mensaje de turno seleccionado

	const [turnoNoEncontrado, setTurnoNoEncontrado] = useState(false)

    const expresiones = {
		nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos.
		telefono: /^\d{7,10}$/ // 7 a 14 numeros.
	}

	// Funcion para guardar la hora del viernes seleccionada
    const diaOnchage = (event) => {
        
        setDia(event.target.value)
    }

    // Funcion para guardar la hora del sabado seleccionada
    const horaOnchage = (event) => {
        
        setHora(event.target.value)

        setTurnos(true) // ponemos el estado del mensaje de turno seleccionado en true
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
		if(name.valido === 'true' && lastName.valido === 'true') {
				
            try {
                
                const response = await axios.delete('/turnodelete', { data: formDelete }) // Envia el objeto fromDelete

                if (response.data.deletedCount === 0) throw new Error('Turno no encontrado')
                
                else {
                    // Limpiarmos todo los estado
                    cambiarName({campo: '', valido: ''});
                    cambiarLastName({campo: '', valido: null});

                    setDia('')
                    setHora('')

                    setTurnos(false)

					cambiarFormularioValido(true);
					setTimeout(() => {
						cambiarFormularioValido(null);
					}, 6000);
                }

            } catch (error) {
                if (error.message === 'Turno no encontrado') {
					setTurnoNoEncontrado(true)
					setTimeout(() => {
						setTurnoNoEncontrado(false)
					}, 4000);
				}
                 
                else toast.error('Error: el servidor no responde', {
					duration: 10000,
					position: 'top-center',
					style: {
					  background: "#212121",
					  color: "#fff"
					}
				})
            }
			
			
		} else {
			// Si hay algun error lanzamos el mensaje de error
			cambiarFormularioValido(false);
			setTimeout(() => {
				cambiarFormularioValido(null);
			}, 4000);
		}
	}

    return (
        <section>

			<Toaster/>

            <Formulario onSubmit={onSubmit}>
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
					{
						// Se mapea el array de objetos sabadoHoras y por cada valor se muestra una opcion
						Horas.map(hour => <option key={hour.value} value={hour.value}> {hour.value} </option>)
					}
				</SelectForm>

				<DivHora>
					{
						// Muestra en pantalla con una etiqueta P el dia y hora seleccionado
						turno === true	&&  <DiaHora><SpanTurno>Turno: </SpanTurno>{name.campo} {lastName.campo}, {dia} {hora}</DiaHora>
					}
				</DivHora>

				{
					turnoNoEncontrado === true && <MensajeTurnoNoEncontrado><b>Error:</b> Turno no encontado</MensajeTurnoNoEncontrado>
				}

				{
					formularioValido === false && <MensajeError>
						<p>
							<FontAwesomeIcon icon={faExclamationTriangle}/>
							<b>Error:</b> Formulario Incorrecto.
						</p>
					</MensajeError>
				}

				<ContenedorBotonCentrado>
					
					{formularioValido === true && <MensajeExito>Turno eliminado exitosamente!</MensajeExito>}
					
					<Boton>Eliminar Turno</Boton>
				</ContenedorBotonCentrado>

			</Formulario>

            <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div class="col-md-4 d-flex align-items-center">
                    <span class="mb-3 mb-md-0 text-body-secondary">&copy; 2023 Mediopelo.barbershop</span>
                </div>
            </footer>
            
        </section>
    )
}

export default Form