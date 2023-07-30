import { IUserSchema } from "@models/ICollections";
import collections from "@models/index.collections"
import { ApplicationError } from "@utils/applicationError";
import config from 'config'
import { IUpdateUserRequest } from "./dto/updateUser.dto";

/**
 * Obtener usuario por determinado campo
 * @param field Campo por el cual se buscara
 * @param value Valor del campo en cuestion
 * @returns Usuario encontrado o null
 */
const getUserByField = async (
    objFind: any
): Promise<IUserSchema | null> => {
    try {
        return await collections.Users.findOne(objFind).populate([
            { strictPopulate: false, path: 'Technologies' },
            { // Hacemos populate de los proyectos que tiene el usuario
                strictPopulate: false, path: 'Projects', populate: {
                    // hacemos populate de los colaboradores de los proyectos del usuario.
                    strictPopulate: false, path: 'Colaborators'
                }
            }
        ]);
    } catch (error) {
        throw new ApplicationError({
            message: 'Ha ocurrido un error al obtener el usuario',
            source: error
        });
    }
}

const updateUser = async (
    payload: IUpdateUserRequest
): Promise<IUserSchema | null> => {
    try {
        return await collections.Users.findByIdAndUpdate(
            payload.idUser,
            {
                fullName: payload.fullName,
                seniority: payload.seniority,
                aboutMe: payload.aboutMe,
                mySkills: payload.mySkills,
                ...(payload.imageProfile && {
                    imageProfile: `${config.get('server.public_url')}/${payload.imageProfile[0].filename}`,
                }),
                curriculumVitae: payload.curriculumVitae
            }
        )
    } catch (error) {
        throw new ApplicationError({
            message: 'Ha ocurrido un error al actualziar este album',
            source: error
        })
    }
}

export default { getUserByField, updateUser }