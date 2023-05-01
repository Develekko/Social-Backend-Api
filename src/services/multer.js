import multer from "multer";
export const validationObject = {
    image:['image/png','image/jpeg'],
    file:['application/pdf']
}
export const fileUpload = ({customValidation = validationObject.image,maxSize = 3}={})=>{
    const storage = multer.diskStorage({})
    const limits = {fileSize: maxSize*1000*1000}
    const fileFilter = (req,file,cb)=>{
        if(customValidation.includes(file.mimetype))
        {
            return cb(null,true)
        }
        cb(new Error(`File with extenstion (${file.originalname.slice(file.originalname.lastIndexOf("."))}) is not allowed`,{cause:415},false))
    }
    const upload = multer({fileFilter,storage,limits})
    return upload
}