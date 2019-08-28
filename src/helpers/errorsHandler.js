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
        case 'auth/weak-password':
            return 'Tu contraseña debe contener por lo menos 6 caracteres.'
        case 'Las constraseñas no coinciden':
            return 'Las constraseñas no coinciden'
        case 'No has completado todos los campos':
            return 'No has completado todos los campos'
        default:
            return 'Algo ha salido mal. Porfavor vuelve a intentarlo.'
    }
}
