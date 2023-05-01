import joi from 'joi';
import { generalFields } from '../../Utlis/GeneralFields.js';

export const addPostSchema = joi.object({
    title:generalFields.name,
    file:joi.array().items(generalFields.file),
}).required()

export const userIdSchema = joi.object({
    userId:generalFields.id,
}).required()

export const updatePostSchema = joi.object({
    title:generalFields.name,
    file:joi.array().items(generalFields.file),
    post_id:generalFields.id
}).required()

export const reactPostSchema = joi.object({
    post_id:generalFields.id,
    react:joi.string().valid('like','celebrate','support','insightful','funny','love')
}).required()

export const postIdSchema = joi.object({
    post_id:generalFields.id,
}).required()

export const postPrivacySchema = joi.object({
    post_id:generalFields.id,
    privacy:joi.string().valid('true','false').required()
}).required()
