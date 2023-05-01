import joi from 'joi';
import { generalFields } from '../../Utlis/GeneralFields.js';
export const updateUserScehma = joi.object({
    name:joi.string().min(2).max(50),
    phone: generalFields.phone,
    headline:joi.string().min(3).max(100)
}).required()

export const changePasswordUserScehma = joi.object({
    oldPassword:generalFields.password,
    newPassword: generalFields.password.invalid(joi.ref('oldPassword')).messages({'any.invalid':'your new password cannot be your old password'}),
    confirmPassword: generalFields.confirmPassword.valid(joi.ref('newPassword')),
}).required()


export const recoverUserScehma = joi.object({
    token:generalFields.token
}).required()

export const uploadPictureSchema = joi.object({
    file:generalFields.file
}).required()

export const idScehma = joi.object({
    userId:generalFields.id
}).required()
export const acceptconnectionScehma = joi.object({
    userId:generalFields.id,
    connection:joi.string().valid('accept','reject')
}).required()