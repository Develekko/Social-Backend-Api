import joi from 'joi';
import { generalFields } from '../../Utlis/GeneralFields.js';
export const signUpScehma = joi.object({
    name:generalFields.name,
    email: generalFields.email,
    password: generalFields.password,
    confirmPassword: generalFields.confirmPassword.valid(joi.ref('password')),
    age:generalFields.age,
    phone:generalFields.phone,
    gender:generalFields.gender
}).required()

export const signInScehma = joi.object({
    email: generalFields.email,
    password: generalFields.password
}).required()

export const refreshTokenScehma = joi.object({
    token: generalFields.token
}).required()

export const confirmEmailSchema = joi.object({
    token: generalFields.token
}).required()
export const forgotPasswordSchema = joi.object({
    email: generalFields.email
}).required()

export const resetPasswordSchema = joi.object({
    otp:generalFields.otp,
    newPassword: generalFields.password,
    confirmPassword: generalFields.confirmPassword.valid(joi.ref('newPassword')),
    email: generalFields.email
}).required()
