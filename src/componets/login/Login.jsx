import style from './Login.module.css'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import toast, { Toaster } from 'react-hot-toast';

import { DivFormLogin, FormLogin, LabelLogin, InputLogin, DivInput, InputDiv, ButtonLogin, Mesaje } from '../../elementos/Login'

const cookies = new Cookies()

const Login = () => {

    // Si el usuario quizo iniciar sesion con un user o password incorrecto lanzamos un error
    const [error, setError] = useState(false)

    // Guardamos lo que el usuario escribio en los input para consultar en la debe si el user y password existen
    const [login, setLoign] = useState({
        user: '',
        password: ''
    })

    const [showPwd, setShowPwd] =  useState(false)

    const handleChange = (event) => {
        setLoign({
            ...login,
            [event.target.name]: event.target.value
        })
        setError(false)
    }

    const handleOnSubmit = async (event) => {

        event.preventDefault()

        try {
            
            const respuesta =  await axios.post('/autho/login', {}, {params: {user: login.user, password: login.password}})

            if(respuesta) {
                cookies.set('id', respuesta.data.id, {path: "/"})
                cookies.set('user', respuesta.data.user, {path: "/"})
                cookies.set('password', respuesta.data.password, {path: "/"})

                window.location.href="./crud"
            } 
        
        } catch (error) {

            if(error.message === "Network Error"){
            
                toast.error('Error: el servidor no responde', {
                    duration: 10000,
                    position: 'top-center',
                    style: {
                        background: "#212121",
                        color: "#fff"
                    }
                })
            
            } else {
                setError(true)
            }
        }
    }

    useEffect(() => {
        if (cookies.get('user')) {
            window.location.href='./crud'
        }
    }) 

    return (
        <section>
            <Toaster/>

            <DivFormLogin>

                <FormLogin onSubmit={handleOnSubmit}>

                    <LabelLogin htmlFor="user">Usuario</LabelLogin>
                    <InputLogin
                        type="text" 
                        name='user'
                        placeholder='Usuario' 
                        value={login.user} 
                        onChange={handleChange} 
                    />

                    <LabelLogin htmlFor="password">Contraseña</LabelLogin>
                    
                    <DivInput>

                        <InputDiv
                            type={showPwd ? "text" : "password"} 
                            name='password'
                            placeholder='Contraseña' 
                            value={login.password} 
                            onChange={handleChange} 
                        />
                        
                        <div onClick={() => setShowPwd(!showPwd)}>
                            {
                                showPwd 
                                    ? <i class="fa-regular fa-eye" id={style.id}></i> 
                                    : <i class="fa-regular fa-eye-slash" id={style.id}></i> 
                                
                            }
                        </div>     
                        
                    </DivInput>
                    
                    {
                        error === true && <Mesaje>usuario o contraseña incorrecto</Mesaje>
                    }

                    <ButtonLogin className={style.button}>Iniciar Sesion</ButtonLogin>
                    
                </FormLogin>

            </DivFormLogin>

        </section>
    )
}

export default Login