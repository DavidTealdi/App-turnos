const validate = (input) => {
    let error = {}

    if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(input.name)) {
        error.name = 'Nombre Incorrecto'
    
    } else {
        
        if (input.name.length <= 2) {
            error.name = 'Nombre muy corto'
        
        } else {
            
            if (!input.name) {
                error.name = 'Debe ingresar un nombre'
            
            } else {
                
                if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(input.lastName)) {
                    error.lastName = 'Apellido Incorrecto'
                
                } else {

                    if (!input.lastName) {
                        error.lastName = 'Debe ingresar un apellido'
                    
                    } else {

                        if (input.lastName.length < 3) {
                            error.lastName = 'Apellido muy corto'
                        }
                    }
                }
            }
        }
    }

    return error
}

export default validate