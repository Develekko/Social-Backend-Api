import userModel from '../../../../DB/models/user.model.js'
import { compare, Hash } from '../../../Utlis/HashCompare.js'
import { asyncHandler } from '../../../Utlis/ErrorHandeling.js'
import { generateToken, verifyToken } from '../../../Utlis/TokenGenerator.js'
import sendMail from '../../../services/sendMail/sendmail.js';
import { otp } from '../../../Utlis/otpGenerator.js';
import moment from 'moment/moment.js';
import cloudinary from '../../../Utlis/cloudinary.js';
import path from 'path'
import {fileURLToPath} from 'url'

export const signUp = asyncHandler(async (req, res, next) => {
  const { name, email, password,age,phone,gender} = req.body;
  const checkEmail = await userModel.findOne({ email:email.toLowerCase() });
  if (checkEmail?.isDeleted) {
    return next(new Error("Your account suspended or removed , contact support for more information",{cause:403}));
  }
  if (checkEmail) {
    return next(new Error("Email is already Exist , try another one",{cause:409}));
  }
  const token = generateToken({payload:{email:email.toLowerCase()},signature:process.env.CONFIRM_EMAIL_SIGNAUTRE,expiresIn:60*60*24})
  const confirmLink =req.protocol+'://'+ req.headers.host + '/auth/confirmEmail/' + token

  const refreshToken = generateToken({payload:{email:email.toLowerCase()},signature:process.env.CONFIRM_EMAIL_SIGNAUTRE,expiresIn:60*60*24*30*12})
  const requestNewLink =req.protocol+'://'+ req.headers.host + '/auth/requestNewEmail/' + refreshToken

  if(!sendMail({to:email,subject:'Confirm Your Email',name,confirmLink,requestNewLink,secretPath:'emailConfirmation'}))
  {
    return next(new Error("something went wrong",{cause:440}));
  }
  const HashedPassword = Hash(password);
  const user = await userModel.create({
    name,
    email:email.toLowerCase(),
    password: HashedPassword,
    age,
    phone,
    gender
  });
  //const __dirname =path.dirname(fileURLToPath(import.meta.url))
  //const fullpath = path.join(__dirname,`../../../../public/userProfile/${user.gender //==='male'?'male.jpg':'female.jpg'}`)

const fullpath = path.join(process.cwd(), 'public', 'userProfile', `${user.gender === 'male' ? 'male.jpg' : 'female.jpg'}`);

  const {secure_url,public_id} = await cloudinary.uploader.upload(fullpath,{
    folder:`${process.env.APP_NAME}/users/${user._id}/profile`
  })
  user.images.profile = {url:secure_url,public_id}
  await user.save()
  return res.status(201).json({ status: "success",message:"You should have recieved an a confirmation email", results:{id:user._id,name:user.name,email:user.email} });
});

export const signIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email:email.toLowerCase() });
  if (user?.isDeleted||user?.isBlocked) {
    return next(new Error("Your account suspended or removed , contact support for more information",{cause:403}));
  }
  if (!user) {
    return next(new Error("Email is not Exist",{cause:404}));
  }
  const match = compare({ plaintext: String(password), hash: user.password });
  if (!match) {
    return next(new Error("Invalid Password",{cause:409}));
  }
  if(!user.confirmEmail)
  {
    return next(new Error("You need to confirm Your Email First",{cause:409}));
  }
  const token = generateToken({
    payload: {
      id: user._id,
      name: user.name,
      email: user.email.toLowerCase(),
      role:user.role,
      isLoggedIn: true,
    }
  });
  const refreshToken = generateToken({
    payload: {
      id: user._id,
      name: user.name,
      email: user.email.toLowerCase(),
      role:user.role,
      isLoggedIn: true,
    },
    expiresIn:60*60*24*30
  });
  user.status = "online";
  await user.save();
  return res.status(200).json({
    status: "success",
    message: "LoggedIn successfully",
    token,
    refreshToken
  });
});

export const refreshToken = asyncHandler(async(req,res,next)=>{
  const {token} = req.params
  const decoded = verifyToken({ token });
  const user = await userModel.findById(decoded.id)
  if(user?.isDeleted||user?.isBlocked||!user?.confirmEmail)
  {
    return next(new Error('You are not authorized',{cause:403}))
  }
  const newToken = generateToken({
    payload: {
      id: user._id,
      name: user.name,
      email: user.email.toLowerCase(),
      role:user.role,
      isLoggedIn: true,
    },
    expiresIn:60*30
  });
  const refreshToken = generateToken({
    payload: {
      id: user._id,
      name: user.name,
      email: user.email.toLowerCase(),
      role:user.role,
      isLoggedIn: true,
    },
    expiresIn:60*60*24*30
  });
  return res.status(200).json({status: "success",token:newToken,refreshToken});
})

export const signOut = asyncHandler(async(req,res,next)=>{
  await userModel.findByIdAndUpdate(
    req.user._id,
    { status:"offline"},
    { new: true }
  );
  return res.status(200).json({
    status: "success",
    message: "LoggedOut successfully"
  });
})

export const confirmEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const decoded = verifyToken({token,signature:process.env.CONFIRM_EMAIL_SIGNAUTRE})
  const user = await userModel.findOneAndUpdate({email:decoded.email.toLowerCase()},{confirmEmail:true})
  if(user.confirmEmail)
  {
    return next(new Error("You already confirmed your email",{cause:410}));
  }
      // redirect -> login Page
  return user ? res.status(200).redirect('https://codepen.io/develekko/full/LYrbVpW'):next(new Error("invalid",{cause:400}));
});

export const requestNewEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const decoded = verifyToken({token,signature:process.env.CONFIRM_EMAIL_SIGNAUTRE})
  const user = await userModel.findOne({email:decoded.email.toLowerCase()})
  if(user.confirmEmail)
  {
    // redirect -> login Page
    return next(new Error("You already confirmed your email",{cause:410}));
  }
  const newToken = generateToken({payload:{email:decoded.email.toLowerCase()},signature:process.env.CONFIRM_EMAIL_SIGNAUTRE,expiresIn:60*5})
  const confirmLink =req.protocol+'://'+ req.headers.host + '/auth/confirmEmail/' + newToken
  const requestNewLink =req.protocol+'://'+ req.headers.host + '/auth/requestNewEmail/' + token
  if(!sendMail({to:user.email,subject:'Confirm Your Email',name:user.name,confirmLink,requestNewLink,secretPath:'emailConfirmation'}))
  {
    return next(new Error("something went wrong",{cause:440}));
  }

  return res.status(200).json({ status: "success", message:"You should have recieved a new confirmation email"});
});

export const forgotPassword = asyncHandler(async(req,res,next)=>{
  const {email} = req.body
  const user = await userModel.findOne({email:email.toLowerCase()})
  
  if(!user)
  {
    return next(new Error(`This email (${email}) is not Exist , check it and try again!`,{cause:404}))
  }

  const OTP = otp()
  user.otp = Hash(OTP)
  user.otpexp = moment().add(1, 'day');
  await user.save();
  const resetLink = 'https://codepen.io/develekko/full/oNPpzRb'
  if(!sendMail({to:email,subject:'Forgot Password (OTP Verify)',name:user.name,OTP,userinfo:req.userInfo,userInternetData:req.userInternetData,resetLink,secretPath:'forgotPassword'}))
  {
    return next(new Error("something went wrong",{cause:440}));
  }
  return res.status(200).json({
    status: "success",
    message: "OTP code have been sent via email to your account"
  });
})

export const resetpassword = asyncHandler(async(req,res,next)=>{
  const {email} = req.params
  const {otp,newPassword} = req.body
  const user = await userModel.findOne({email:email.toLowerCase()})
  
  if(!user)
  {
    return next(new Error(`Email is not Exist , check it and try again!`,{cause:404}))
  }
  if(moment().diff(user.otpexp, 'hours')>=0)
  {
    return next(new Error(`OTP code has been Expired`,{cause:410}))
  }
  const match = compare({plaintext:otp,hash:user.otp})
  if(match)
  {
    user.password = Hash(newPassword)
    user.otp = undefined 
    user.otpexp = undefined
    user.status = 'offline'
    await user.save();
    return res.status(200).json({
      status: "success",
      message: "Password has been reset successfully"
    });
  }
  return next(new Error(`Invalid OTP code`,{cause:409}))
})