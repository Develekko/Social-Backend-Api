import moment from 'moment';
import userModel from '../../../../DB/models/user.model.js';
import sendMail from '../../../services/sendMail/sendmail.js';
import cloudinary from '../../../Utlis/cloudinary.js';
import { asyncHandler } from '../../../Utlis/ErrorHandeling.js';
import { compare, Hash } from '../../../Utlis/HashCompare.js';
import { generateToken, verifyToken } from '../../../Utlis/TokenGenerator.js';

// Get User Profile Owner
export const userOwnerProfile = asyncHandler(async(req,res,next)=>{
  const user = await userModel.findById(req.user._id).populate([
  ]).select('-password -images.profile.public_id -images.cover.public_id')
  return res.status(200).json({status: "success",user});
})
// Get User Public Profile
export const userPublicProfile = asyncHandler(async(req,res,next)=>{
  const user = await userModel.findById(req.params.userId).populate([
    {
      path:'connections.accepted',
      select:'name email age phone status gender headline images.profile.url images.cover.url connections.accepted'
    },
    
  ]).select('name email age phone status gender headline images.profile.url images.cover.url connections.accepted')
  return res.status(200).json({status: "success",user});
})
//update user
export const updateUser = asyncHandler(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(req.user._id,req.body,{ new: true }).select(req.body);
  return res.status(200).json({status: "success",message: "Account Updated Successfully",user});
})

//update user Password
export const changePasswordUser = asyncHandler(async (req, res, next) => {
  const { oldPassword,newPassword} = req.body;
  const match = compare({plaintext:oldPassword,hash:req.user.password})
  if(!match)
  {
    // Here for more security Front-End Developer can redirect him to login page after clearing Token
    return next(new Error('Invalid Old Password',{cause:409}))
  }
  const HashedPassword = Hash(newPassword)
  const user = await userModel.findByIdAndUpdate(req.user._id,{ password:HashedPassword,status:'offline'},{ new: true }).select('name email updatedAt');
  if(!sendMail({to:user.email,subject:`${user.name}, your password has changed successfully`,name:user.name,userinfo:req.userInfo,userInternetData:req.userInternetData,secretPath:'changePassword'}))
  {
    return next(new Error("something went wrong",{cause:440}));
  }
  return res.status(200).json({status: "success",message: "Password Updated Successfully",user});
})
//Delete user
export const deleteUser = asyncHandler(async (req, res, next) => {
const user = await userModel.findByIdAndUpdate(req.user._id,{ isDeleted: true ,status:'offline' },{ new: true }).select('name email isDeleted permanentlyDeleted');
user.permanentlyDeleted = moment().add(1, 'month').calendar()
await user.save()
const token = generateToken({payload:{email:user.email.toLowerCase()},signature:process.env.CONFIRM_EMAIL_SIGNAUTRE,expiresIn:60*60*24*30})
const recoverLink =req.protocol+'://'+ req.headers.host + '/user/recovery/' + token
if(!sendMail({to:user.email,subject:'Recover Your Account',name:user.name,recoverLink,secretPath:'recoverAccount'}))
{
  return next(new Error("something went wrong",{cause:440}));
}
return res.json({status: "success",message: "Account Disabled Successfully , u have 30 Day to recover your account , or it will be deleted permanently , in case This was mistake , we send recovery Email",user});

})

//Recover account user
export const recoverUser = asyncHandler(async (req, res, next) => {
  const {token} = req.params
  const decoded = verifyToken({token,signature:process.env.CONFIRM_EMAIL_SIGNAUTRE})
  const user = await userModel.findOneAndUpdate({email:decoded.email.toLowerCase()},{isDeleted:false})
  if(!user)
  {
    return next(new Error("Email is no longer Exist , u need to register a new account",{cause:410}));
  }
  if(!user.isDeleted)
  {
    return next(new Error("you already recoverd your account",{cause:410}));
  }
  user.permanentlyDeleted = undefined
  await user.save()
  return res.status(200).json({status: "success",message:"Email recoverd successfully , u can try login in now"});
  })
  
//Update User profile picture
export const uploadPic = asyncHandler(async (req,res,next)=>{
    if(!req.file)
  {
   return next (new Error('Please select your profile picture',{cause:400}))
  }
  const user = await userModel.findById(req.user._id)
  const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
    folder:`${process.env.APP_NAME}/users/${req.user._id}/profile`
  })
// maybe in other projects ,user might register without default image profile
// also incase if there's any failer happened while using cloudnairy
  if(user.images.profile?.public_id)
  {
    await cloudinary.uploader.destroy(user.images.profile.public_id)
  }
  const updatedUser = await userModel.findByIdAndUpdate(req.user._id,{'images.profile':{
    url: secure_url,
    public_id
  }},{new:true}).select('-images.profile.public_id -images.cover.public_id')
  return res.status(200).json({ status: "success",message:"Profile Picture updated successfully",user:updatedUser});
} )
//Update User cover picture
export const uploadCover = asyncHandler(async (req,res,next)=>{
if(!req.file)
{
 return next (new Error('Please select your Cover picture',{cause:400}))
}
const user = await userModel.findById(req.user._id)
const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
  folder:`${process.env.APP_NAME}/users/${req.user._id}/cover`
})
// maybe in other projects ,user might register without default image profile
// also incase if there's any failer happened while using cloudnairy
if(user.images.cover?.public_id)
{
  await cloudinary.uploader.destroy(user.images.cover.public_id)
}
const updatedUser = await userModel.findByIdAndUpdate(req.user._id,{'images.cover':{
  url: secure_url,
  public_id
}},{new:true}).select('-images.profile.public_id -images.cover.public_id')
return res.status(200).json({ status: "success",message:"Cover Picture updated successfully",user:updatedUser});
} )
// Get User Connections
export const getUserConnections = asyncHandler(async (req,res,next)=>{
  const user = await userModel.findById(req.user._id).populate([
    {
      path:'connections.accepted',
      select:'name  headline images.profile.url connections.accepted'
    },
    {
      path:'connections.requested',
      select:'name  headline images.profile.url connections.accepted'
    },
  ]).select('connections')
  return res.status(200).json({status: "success",connections_accepted:user.connections.accepted.length,connections_requested:user.connections.requested.length,connections:user.connections});
  } )
  
export const requestConnection = asyncHandler(async (req,res,next)=>{
  const user = await userModel.findById(req.params.userId)
  if(!user)
  {
    return next(new Error('User Id is not Exist',{cause:404}))
  }
  if(req.user._id.equals(req.params.userId))
  {
    return next(new Error('you cannot request a connection to your self',{cause:400}))
  }
  if(user.connections.requested.includes(req.user._id))
  {
    return next(new Error('Requested connection has already been sent to the user',{cause:410}))
  }
  user.connections.requested.push(req.user._id)
  await user.save()
  return res.status(200).json({ status: "success",message:"The connection request has been sent successfully"});
  } )
  
// AcceptConnection
export const acceptConnection = asyncHandler(async (req,res,next)=>{
  const socialUser = await userModel.findById(req.params.userId)
  if(!socialUser)
  {
    return next(new Error('User Id is not Exist',{cause:404}))
  }
  const user = await userModel.findById(req.user._id)
  if(!user.connections.requested.includes(req.params.userId))
  {
    return next(new Error('user ID is not found in Requested connections',{cause:410}))
  }
  if(req.query.connection == 'reject')
  {
    user.connections.requested.pull(req.params.userId)
    await user.save()
    return res.status(200).json({ status: "success",message:"The connection request has been rejected"});
  }
  else
  {
    user.connections.requested.pull(req.params.userId)
    user.connections.accepted.push(req.params.userId)
    socialUser.connections.accepted.push(req.user._id)
    await user.save()
    await socialUser.save()
    return res.status(200).json({ status: "success",message:"The connection request has been accepted successfully"});
  }
  })
  
// deleteConnection
export const deleteConnection = asyncHandler(async (req,res,next)=>{
  const socialUser = await userModel.findById(req.params.userId)
  if(!socialUser)
  {
    return next(new Error('User Id is not Exist',{cause:404}))
  }
  const user = await userModel.findById(req.user._id)
  if(!user.connections.accepted.includes(req.params.userId))
  {
    return next(new Error('User Id is not found in your connection List',{cause:404}))
  }
  user.connections.accepted.pull(req.params.userId)
  socialUser.connections.accepted.pull(req.user._id)
  await user.save()
  await socialUser.save()
  return res.status(200).json({ status: "success",message:"The connection has been removed successfully"});
  } ) 

  // MutalConnection
export const mutalConnection = asyncHandler(async (req,res,next)=>{
  const socialUser = await userModel.findById(req.params.userId).populate([
    {
    path:'connections.accepted',
    select:('name email headline images.profile.url images.cover.url connections.accepted')
    }
])
  if(!socialUser)
  {
    return next(new Error('User Id is not Exist',{cause:404}))
  }
  const user = await userModel.findById(req.user._id).populate([
    {
    path:'connections.accepted',
    select:('name email headline images.profile.url images.cover.url connections.accepted')
    }
])

  const mutualConnections = user.connections.accepted.filter(connection => {
    return socialUser.connections.accepted.some(otherConnection => {
      return connection._id.equals(otherConnection._id);
    });
  });

  // const mutalConnections = socialUser.connections.accepted.filter(x=>x==user.connections.accepted)
  return res.status(200).json({ status: "success",message:"The connection has been removed successfully",mutualConnectionsCount:mutualConnections.length,mutualConnections});
  } ) 