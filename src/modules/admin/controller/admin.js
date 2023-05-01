import userModel from '../../../../DB/models/user.model.js';
import { asyncHandler } from '../../../Utlis/ErrorHandeling.js';
//Get all Users
export const getAllUsers = asyncHandler(async (req, res, next) => {
  const user = await userModel.find({}).select('-profile_pic_PublicId -profile_cover_PublicId')
  return res.status(200).json({ status: "success",AllUsers:user.length, results: user});
})

// Get Online Users
export const getOnlineUsers = asyncHandler(async(req,res,next)=>{
const user = await userModel.find({status:'online'}).select('name email')
const count = await userModel.count({status:'online',isDeleted:'false'})
return res.status(200).json({ status: "success",onlineUsers:count, results: user});
})

//Block User
export const blockUser = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.params.id)
  if(!user)
  {
    return next(new Error("user not found",{cause:404}));
  }
  if(user.isBlocked)
  {
    return next(new Error("user is already Blocked",{cause:410}));
  }
  if(user.role == 'admin')
  {
    return next(new Error("you can't block another Admin",{cause:403}));
  }
  user.isBlocked = true
  await user.save()
  return res.status(200).json({ status: "user Blocked successfully",user:{_id:user._id,name:user.name,email:user.email,isBlocked:true}});
})
// Un Block User
export const unBlockUser = asyncHandler(async (req, res, next) => {
  const {id} = req.params
  const user = await userModel.findByIdAndUpdate({_id:id},{isBlocked:false})
  if(!user)
  {
    return next(new Error("user not found",{cause:404}));
  }
  if(!user.isBlocked)
  {
    return next(new Error("user is already not Blocked",{cause:410}));
  }
  return res.status(200).json({ status: "user UnBlocked successfully",user:{_id:user._id,name:user.name,email:user.email,isBlocked:false}});
})


     