export const asyncHandler = (fn)=>{
    return(req,res,next)=>{
        fn(req,res,next).catch(err=>{
            return next(err)
        })
    }
}
export const globalErrorHandling = (err,req,res,next)=>{
    if(err)
    {
        if(process.env.MOOD == 'DEV')
        {
            return res.status(err.cause||500).json({status:'Failed',message:err.message,err,stack:err.stack})
        }
        return res.status(err.cause||500).json({status:'Failed',message:err.message})
    }
}