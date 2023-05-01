import joi from 'joi';
import { generalFields } from '../../Utlis/GeneralFields.js';
export const idScehma = joi.object({
    id:generalFields.id,
}).required()
