import styled, {css} from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const colores = {
	borde: "#0075FF",
	error: "#bb2929",
	exito: "#1ed12d"
}

const Formulario = styled.form`
	display: grid;
	grid-template-columns: 1fr;
	gap: 20px;

	@media (max-width: 800px){
		grid-template-columns: 1fr;
	}
`;

const Label = styled.label`
	margin-left: 400px;
	margin-right: 400px;
	display: block;
	font-weight: 700;
	padding: 10px;
	min-height: 40px;

	${props => props.valido === 'false' && css`
		color: ${colores.error};
	`}

	@media (max-width: 2000px){
		margin-left: 400px;
		margin-right: 400px;
	}

	@media (max-width: 1500px){
		margin-left: 200px;
		margin-right: 200px;
	}

	@media (max-width: 1010px){
		margin-left: 100px;
		margin-right: 100px;
	}

	@media (max-width: 800px){
		margin-left: 50px;
		margin-right: 50px;
	}

	@media (max-width: 700px){
		margin-left: 30px;
		margin-right: 30px;
	}

	@media (max-width: 600px){
		margin-left: 10px;
		margin-right: 10px;
	}
`;

const GrupoInput = styled.div`
	margin-left: 400px;
	margin-right: 400px;
	position: relative;
	z-index: 90;

	@media (max-width: 2000px){
		margin-left: 400px;
		margin-right: 400px;
	}

	@media (max-width: 1500px){
		margin-left: 200px;
		margin-right: 200px;
	}

	@media (max-width: 1010px){
		margin-left: 100px;
		margin-right: 100px;
	}

	@media (max-width: 800px){
		margin-left: 50px;
		margin-right: 50px;
	}

	@media (max-width: 700px){
		margin-left: 30px;
		margin-right: 30px;
	}

	@media (max-width: 600px){
		margin-left: 10px;
		margin-right: 10px;
	}
`;

const Input = styled.input`
	width: 100%;
	background: #fff;
	border-radius: 3px;
	height: 45px;
	line-height: 45px;
	padding: 0 40px 0 10px;
	transition: .3s ease all;
	border: 3px solid black;

	&:focus {
		border: 3px solid ${colores.borde};
		outline: none;
		box-shadow: 3px 0px 30px rgba(163,163,163, 0.4);
	}

	${props => props.valido === 'true' && css`
		border: 3px solid black;
	`}

	${props => props.valido === 'false' && css`
		border: 3px solid ${colores.error} !important;
	`}
`;

const LabelForm = styled.label`
	display: flex;
	justify-content: center;
	margin-top: 1px;
	margin-bottom: 0;
	font-size: 17px;
	font-weight: 700;
`;

const SelectForm = styled.select`
	/* margin: 0 10px; */
	margin: auto;
	padding: 10px;
	border-radius: 6px;
	font-size: 16px;
	cursor: pointer;

	&:focus {
		border: 3px solid ${colores.borde};
		outline: none;
	}
	
`;

const LeyendaError = styled.p`
	margin-left: 400px;
	margin-right: 400px;
	font-size: 12px;
	margin-bottom: 0;
	color: ${colores.error};
	display: none;

	@media (max-width: 2000px){
		margin-left: 400px;
		margin-right: 400px;
	}

	@media (max-width: 1500px){
		margin-left: 200px;
		margin-right: 200px;
	}

	@media (max-width: 1010px){
		margin-left: 100px;
		margin-right: 100px;
	}

	@media (max-width: 800px){
		margin-left: 50px;
		margin-right: 50px;
	}

	@media (max-width: 700px){
		margin-left: 30px;
		margin-right: 30px;
	}

	@media (max-width: 600px){
		margin-left: 10px;
		margin-right: 10px;
	}

	${props => props.valido === 'true' && css`
		display: none;
	`}

	${props => props.valido === 'false' && css`
		display: block;
	`}
`;

const DivHora = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 10px;
`;

const DiaHora = styled.p`
    padding: 10px;
    border: 3px solid  #000;
    border-radius: 6px;
    font-weight: 500;
`;

const SpanTurno = styled.span`
	margin-right: 6px;
	font-weight: 700;
	font-size: 18px;
`;

const IconoValidacion = styled(FontAwesomeIcon)`
	position: absolute;
	right: 10px;
	bottom: 14px;
	z-index: 100;
	font-size: 16px;
	opacity: 0;

	${props => props.valido === 'false' && css`
		opacity: 1;
		color: ${colores.error};
	`}

	${props => props.valido === 'true' && css`
		opacity: 1;
		color: ${colores.exito};
	`}
`;


const ContenedorBotonCentrado = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	grid-column: span 1;

	@media (max-width: 800px){
		grid-column: span 1;
	}
`;

const Boton = styled.button`
	height: 45px;
	line-height: 45px;
	width: 30%;
	background: #000;
	color: #fff;
	font-weight: bold;
	border: none;
	border-radius: 3px;
	cursor: pointer;
	transition: .1s ease all;

	&:hover {
		box-shadow: 3px 0px 30px rgba(163,163,163, 1);
	}
`;

const MensajeExito = styled.p`
	font-size: 17px;
	color: ${colores.exito};
`;

const MensajeError = styled.div`
	margin: auto;
	height: 45px;
	line-height: 45px;
	background: #F66060;
	padding: 0px 15px;
	border-radius: 3px;
	grid-column: span 1;
	overflow: hidden;
	p {
		margin: 0;
	} 
	b {
		margin-left: 10px;
	}	
`;

export {
	Formulario,
	Label,
	GrupoInput,
	Input,
	LabelForm,
	SelectForm,
	DivHora,
	DiaHora,
	SpanTurno,
	LeyendaError,
	IconoValidacion,
	ContenedorBotonCentrado,
	Boton,
	MensajeExito,
	MensajeError
};