import * as dotenv from 'dotenv'; 
import path from 'path'
import {fileURLToPath} from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({path:path.join(__dirname,'../../config/.env')});
import cloudinary from 'cloudinary'
cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET,
    secure:true
})

export default cloudinary.v2