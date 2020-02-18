export const identifyAndReturnMsgError=(errorCode)=>{
    switch (errorCode) {
        case 'auth/invalid-email':
            return 'No has ingresado un correo valido'
        case 'auth/wrong-password':
            return 'Contraseña incorrecta'
        case 'auth/user-not-found':
            return 'El usuario que has introducido no existe'
        case 'auth/network-request-failed':
            return 'Tu conexion a internet es inestable. Porfavor vuelve a intentarlo.'
        case 'auth/email-already-in-use':
            return 'El email ya esta en uso. Porfavor introduce otro email.'
        case 'auth/weak-password':
            return 'Tu contraseña debe contener por lo menos 6 caracteres.'
        case 'Las constraseñas no coinciden':
            return 'Las constraseñas no coinciden'
        case 'No has completado todos los campos':
            return 'No has completado todos los campos'
        case 'onlyImages':
            return 'Solo puedes cargar imagenes'
        case 'writeOpenCaseData':
            return 'Porfavor ingresa el motivo y una descripcion del caso.'
        case 'error al crear caso':
            return 'Algo ha salido mal al momento de crear el caso. Porfavor vuelte a intentarlo.'
        case 'auth/invalid-phone-number':
            return 'No has introducido un numero de telefono valido.'
        case 'auth/invalid-verification-code':
            return 'El codigo de verificacion no es correcto.'
        case 'auth/missing-verification-code':
            return 'No se ha encontrado numero de verificacion. Vuelve a ingresarlo.'
        default:
            return 'Algo ha salido mal. Porfavor vuelve a intentarlo.'
    }
}



