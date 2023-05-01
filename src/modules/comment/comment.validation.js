import joi from 'joi';
import { generalFields } from '../../Utlis/GeneralFields.js';
export const addCommentSchema = joi.object({
    text:generalFields.name,
    file:generalFields.file,
    post_id:generalFields.id
}).required()

export const updateCommentSchema = joi.object({
    text:generalFields.name,
    file:generalFields.file,
    post_id:generalFields.id,
    comment_id:generalFields.id
}).required()

export const reactCommentSchema = joi.object({
    post_id:generalFields.id,
    comment_id:generalFields.id,
    react:joi.string().valid('like','celebrate','support','insightful','funny','love')
}).required()

export const IdSchema = joi.object({
    post_id:generalFields.id,
    comment_id:generalFields.id
}).required()