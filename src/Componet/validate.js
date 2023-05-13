const validate = (input) => {
    let error = {}

    if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(input.name)) {
        error.name = '⛔ Nombre Incorrecto'
    
    } else {
        
        if (input.name.length <= 2) {
            error.name = '⛔ Nombre muy corto'
        
        } else {
            
            if (!input.name) {
                error.name = '⛔ Debe ingresar un nombre'
            
            } else {
                
                if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(input.lastName)) {
                    error.lastName = '⛔ Apellido Incorrecto'
                
                } else {

                    if (!input.lastName) {
                        error.lastName = '⛔ Debe ingresar un apellido'
                    
                    } else {

                        if (input.lastName.length < 3) {
                            error.lastName = '⛔ Apellido muy corto'
                        }
                    }
                }
            }
        }
    }

    // if (!/^\d{7,14}$/.test(input.number)) {
    //     error.number = 'No ingrese espacios entre numero ni caracteres especiales'
    // }

    // if (input.number.length < 10) {
    //     error.number = 'Numero inválido. Minimo 10 caracteres'
    // }

    return error
}

export default validate