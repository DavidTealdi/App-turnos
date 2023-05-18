import style from './Login.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const Login = () => {

    const [error, setError] = useState(false)

    const [login, setLoign] = useState({
        user: '',
        password: ''
    })

    const handleChange = (event) => {
        setLoign({
            ...login,
            [event.target.name]: event.target.value
        })
    }

    const handleOnSubmit = async (event) => {

        event.preventDefault()

        try {
            
            await axios.get('/login', {params: {user: login.user, password: login.password}})
            .then(response => {
                return response.data
            })
            .then(data => {
                if(data.length > 0) {

                    let respuesta = data[0]

                    cookies.set('id', respuesta.id, {path: "/"})
                    cookies.set('user', respuesta.user, {path: "/"})
                    cookies.set('password', respuesta.password, {path: "/"})
                    
                    window.location.href="./crud"
                
                } else {
                    setError(true)
                }
            })
        
        } catch (error) {

            console.log(error.response.data)    
        }
    }

    useEffect(() => {
        if (cookies.get('user')) {
            window.location.href='./crud'
        }
    }) 

    //select * from "Login" where user = (user que mandamos) and password = (password que mandamos)

    return (
        <div className={style.login}>

            <form onSubmit={handleOnSubmit} className={style.form_login}>

                <label htmlFor="user" className={style.label_login}>Usuario</label>
                <input className={style.input_login} 
                    type="text" 
                    name='user'
                    placeholder='Usuario' 
                    value={login.user} 
                    onChange={handleChange} 
                />

                <label htmlFor="password" className={style.label_login}>Contraseña</label>
                <input className={style.input_login} 
                    type="password" 
                    name='password'
                    placeholder='Contraseña' 
                    value={login.password} 
                    onChange={handleChange} 
                />
                
                {
                    error === true && <p className={style.pLogin}>Usuario o contraseña incorrecto</p>
                }

                <button className={style}>Iniciar Sesion</button>
                
            </form>
        </div>
    )
}

export default Login