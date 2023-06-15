import {useEffect, useState } from 'react'
import axios from 'axios'
import {Formulario, ContenedorBotonCentrado, Boton, MensajeExito, MensajeError, SelectForm, LabelForm, DivHora, DiaHora, SpanTurno } from '../../elementos/Formularios' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import Input from '../Input';

// Varianble para guardar las opciones del select de hora viernes
const viernesHoras = [ {value: "Seleccione una hora"}, {value: '9:00hs'}, {value: '9:30hs'}, {value: '10:00hs'}, {value: '10:30hs'}, {value: '11:00hs'}, {value: '11:30hs'}, {value: '14:00hs'}, {value: '14:30hs'}, {value: '15:00hs'} ]

// Varianble para guardar las opciones del select de hora viernes
const sabadoHoras = [ {value: "Seleccione una hora"}, {value: '9:00hs'}, {value: '9:30hs'}, {value: '10:00hs'}, {value: '10:30hs'}, {value: '11:00hs'}, {value: '11:30hs'}, {value: '14:00hs'}, {value: '14:30hs'}, {value: '15:00hs'} ]


const Form = () => {
    const [name, cambiarName] = useState({campo: '', valido: null}); // Estado para almacenar el nombre
	const [lastName, cambiarLastName] = useState({campo: '', valido: null}); // Estado para almacenar el apellido
	const [number, cambiarNumber] = useState({campo: '', valido: null}); // Estado para almacenar el numero
	
	const [formularioValido, cambiarFormularioValido] = useState(null);
	
	const [horaViernes, setViernes] = useState("") 
    const [horaSabado, setSabado] = useState("")
	
	const [turno, setTurnos] = useState(false) // Estado para manejar el mensaje de turno seleccionado

    const expresiones = {
		nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos.
		telefono: /^\d{7,10}$/ // 7 a 14 numeros.
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
        name: name.campo,
        lastName: lastName.campo,
        number: number.campo,
        dia: 'Viernes',
        hora: horaViernes 
    }

	// Objeto para guardar todos los estado 
    // y enviarlos al servidor si el turno es sabado
	let fromSabado = {
        name: name.campo,
        lastName: lastName.campo,
        number: number.campo,
        dia: 'Sabado',
        hora: horaSabado
    }

	// Funcion para para mandar todo al servidor cuando se haga click en guardar
    const onSubmit = async (e) => {
		e.preventDefault();

		// Verificamos si no hay errores en los input para poder enviarlos al servidor
		if(name.valido === 'true' && lastName.valido === 'true') {

			// Si el estado horaViernes no esta vacio, enviamos un turno dia viernes
			if (horaViernes !== '') {
				
				try {
					
					const response = await axios.post('/turno', fromViernes) // Envia el objeto fromViernes

					// Limpiarmos todo los estado
					cambiarFormularioValido(true);
					cambiarName({campo: '', valido: ''});
					cambiarLastName({campo: '', valido: null});
					cambiarNumber({campo: '', valido: null});

					if (horaViernes !== '') setViernes('')
                	if (horaSabado !== '') setSabado('')

				} catch (error) {
					alert("404 Not Found: Error al guardar el turno")
				}
			}

			// Si el estado horaSabado no esta vacio, enviamos un turno dia sabado
			if (horaSabado !== '') {
				
				try {
					
					const response = await axios.post('/turno', fromSabado) // Envia el objeto fromSabado

					// Limpiarmos todo los estado
					cambiarFormularioValido(true);
					cambiarName({campo: '', valido: ''});
					cambiarLastName({campo: '', valido: null});
					cambiarNumber({campo: '', valido: null});

					if (horaViernes !== '') setViernes('')
                	if (horaSabado !== '') setSabado('')

				} catch (error) {
					alert("404 Not Found: Error al guardar el turno")
				}
			}
			
		} else {
			// Si hay algun error lanzamos el mensaje de error
			cambiarFormularioValido(false);
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
			console.log(error.message)
        }
    }

	// Cuando se monte el compenente llama a la funcion horasFn()
	useEffect(() => {
        horasFn()
    }, [])

    return (
        <section>

            <Formulario action="" onSubmit={onSubmit}>
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

				<LabelForm htmlFor='hour'> Viernes </LabelForm>
				<SelectForm id='horaViernes' value={horaViernes} onChange={viernesOnchage} >
					{                         
						// Se mapea el array de objetos ViernesHoras y por cada valor se muestra una opcion
						viernesHoras.map(hour => <option key={hour.value} value={hour.value}> {hour.value} </option>)
					}
				</SelectForm>

				<LabelForm htmlFor='hour'> Sabado </LabelForm>
				<SelectForm id='horaSabado' value={horaSabado} onChange={sabadoOnchage} >
					{
						// Se mapea el array de objetos sabadoHoras y por cada valor se muestra una opcion
						sabadoHoras.map(hour => <option key={hour.value} value={hour.value}> {hour.value} </option>)
					}
				</SelectForm>

				<DivHora>
					{
						// Muestra en pantalla con una etiqueta P el dia y hora seleccionado
						turno === true 
							
							&&  

						horaViernes 
						
							? <DiaHora><SpanTurno>Turno: </SpanTurno> Viernes {horaViernes}</DiaHora>
						
						: horaSabado 
							? <DiaHora><SpanTurno>Turno: </SpanTurno> Sabado {horaSabado}</DiaHora> 
						
						: null
					}
				</DivHora>

				{formularioValido === false && <MensajeError>
					<p>
						<FontAwesomeIcon icon={faExclamationTriangle}/>
						<b>Error:</b> Formulario Incorrecto.
					</p>
				</MensajeError>}
				<ContenedorBotonCentrado>
					
					{formularioValido === true && <MensajeExito>Formulario enviado exitosamente!</MensajeExito>}
					
					<Boton>Guardar</Boton>
				</ContenedorBotonCentrado>

			</Formulario>
            
        </section>
    )
}

export default Form