import jwt from 'jsonwebtoken'
import config from 'config'
import { ApplicationError } from './applicationError'

/**
 * A partir de los datos del usuario, crea un token que expira en 1h 
 * @param resource Datos/recursos del usuario para almacenar en el token.
 * @returns Token
 */
const tokenSign = (resource: any): string => {
    const sign = jwt.sign(
        /* Definimos los datos que contendra el token y ue prodremos ver al desencriptarlo */
        {
            id: resource._id,
            userAgent: resource.userAgent,
            remoteAddress: resource.remoteAddress,
        },
        // Pasamos la clave secreta
        config.get('jwt_secret') as string,

        // Indicamos algunas especificaciones opcionales
        { expiresIn: config.get('expire_jwt') as number } // 60 seg * 10 = 10min
    )
    return sign
}

/**
 * Verifica la existencia del Token
 * @param tokenJwt Token del usuario logueado
 * @returns Un objeto con todos los datos que posee dicho token
 */
const verifyToken = (tokenJwt: string) => {
    try {
        return jwt.verify(tokenJwt, config.get('jwt_secret') as string)
    } catch (error) {
        throw new ApplicationError({
            message: 'Ocurrio un error de autenticacion.',
            source: error, status: 401
        });
    }
}


export default {
    tokenSign,
    verifyToken
}