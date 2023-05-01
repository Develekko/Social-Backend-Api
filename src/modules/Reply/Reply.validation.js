import joi from 'joi';
import { generalFields } from '../../Utlis/GeneralFields.js';

export const addReplayScehma = joi.object({
    text:generalFields.name,
    file:generalFields.file,
    post_id:generalFields.id,
    comment_id:generalFields.id
}).required()

export const updateReplayScehma = joi.object({
    text:generalFields.name,
    file:generalFields.file,
    post_id:generalFields.id,
    comment_id:generalFields.id,
    reply_id:generalFields.id,
}).required()

export const idScehma = joi.object({
    post_id:generalFields.id,
    comment_id:generalFields.id,
    reply_id:generalFields.id,
}).required()

export const reactScehma = joi.object({
    post_id:generalFields.id,
    comment_id:generalFields.id,
    reply_id:generalFields.id,
    react:joi.string().valid('like','celebrate','support','insightful','funny','love')
}).required()