const validation = (schema) => {
    return (req,res,next)=>{
        const inputs = {...req.body,...req.params,...req.query}
        if(req.file || req.files)
        {
            inputs.file = req.file || req.files
        }
        const validationResult = schema.validate(inputs,{abortEarly:false})
        if(validationResult.error)
        {
            return res.status(409).json({status:'failed',errors:validationResult.error.details.map(err=>err.message)})
        }
        return next()
    }
}
export default validation;