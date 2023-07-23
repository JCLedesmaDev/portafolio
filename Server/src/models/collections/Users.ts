import { IUserSchema } from '@models/ICollections';
import { model, Schema, Types } from 'mongoose';
import mongooseDelete, { SoftDeleteModel } from 'mongoose-delete';

const UserSchema = new Schema<IUserSchema>({
    fullName: { type: String, required: false },
    imageProfile: {type: String, required: false},
    seniority: { type: String, required: false },
    aboutMe: { type: String, required: false },
    mySkills: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    projectList: {type: [{ type: Types.ObjectId, ref: "Projects" }], required: false, default: []},
    techologyList: { type: [{ type: Types.ObjectId, ref: "Technologies" }], required: false, default: []},
    curriculumVitae: { type: String, required: false },
}, {
    timestamps: true, // Nos crea un campo mas con la fecha de creacion y actualizacion del registro
    versionKey: false // Desactivamos la version del dato dentro de mongoose  
})

/* Le indicamos a nuestro modelo, que sobre escriba los metodos
 le que brinda mongoose, por los que nos brinda mongooseDelete */
UserSchema.plugin(mongooseDelete, { overrideMethods: 'all' })


export default model<IUserSchema, SoftDeleteModel<IUserSchema>>('Users', UserSchema);
