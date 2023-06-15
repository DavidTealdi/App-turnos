import styled from 'styled-components';

const DivFormLogin = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const FormLogin = styled.form`
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const LabelLogin = styled.label`
    margin-top: 14px;
    font-size: 20px;
`;

const InputLogin = styled.input`
    width: 95%;
    height: 30px;
    padding: 22px;
    border: 2px solid #000;
    font-size: 16px;
`;

const DivInput = styled.div`
    position: relative;
    z-index: 90;
    width: 95%;
`;

const InputDiv = styled.input`
    width: 100%;
    height: 45px;
    line-height: 45px;
    padding: 0 40px 0 10px;
    border: 2px solid #000;
`;

const ButtonLogin = styled.button`
    margin-top: 20px;
    background-color: #000;
    color: #fff;
    padding: 7px;
    font-size: 18px;
    border-radius: 3px;
    border: none;
`;

const Mesaje = styled.p`
    margin-top: 20px;
    height: 45px;
	line-height: 45px;
	background: #F66060;
	padding: 0px 15px;
	border-radius: 3px;
    font-size: 18px;
	grid-column: span 1;
	overflow: hidden;
`;

export {
    DivFormLogin,
    FormLogin,
    LabelLogin,
    InputLogin,
    DivInput,
    InputDiv,
    ButtonLogin,
    Mesaje
}