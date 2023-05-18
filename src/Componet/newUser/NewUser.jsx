import axios from "axios"
import { useState } from "react"




const NewUser = () => {

    const [input, setInput] = useState({  
        user: '',
        password: ''
    })

    const handleOnSubmit = async () => {
    
        try {
            
            const respose = await axios.post('/login', input)
            
            console.log(respose)
    
        } catch (error) {
            console.log(error)
        }
    
    }
    
    const handleInput = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div>
            <form onSubmit={handleOnSubmit}></form>
            <input 
                type="text" name="user" 
                placeholder="usuario" 
                value={input.user} 
                onChange={handleInput} 
            />

            <input 
                type="text" 
                name="password" 
                placeholder="usuario" 
                value={input.user} 
                onChange={handleInput}
            />
            <button> Crear usuario </button>
        </div>
    )
}

export default NewUser