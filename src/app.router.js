import userRouter from './modules/user/user.router.js' 
import authRouter from './modules/auth/auth.router.js' 
import adminRouter from './modules/admin/admin.router.js' 
import postRouter from  './modules/post/post.router.js'
import connectDB from '../DB/connection.js' 
import cors from 'cors' 
import { globalErrorHandling } from './Utlis/ErrorHandeling.js' 
import { deleteUserFromCloud } from './Utlis/cronJob.js'
const initApp = (express, app) => {
  app.use(async(req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','*');
    res.setHeader('Access-Control-Allow-Private-Network','true');
    res.setHeader('Access-Control-Allow-Methods','*')
    next()
  })
  app.use(express.json({}));
  app.get('/',(req,res,next)=>{
    return res.status(200).json({status:"Success",message:"welcome to social-backend-api",docs:"https://github.com/Develekko/Social-Backend-Api#-api-documentation"})
})
  app.use("/user", userRouter);
  app.use("/auth", authRouter);
  app.use("/admin", adminRouter);
  app.use("/post", postRouter);
  app.all("*", (req, res) => {
    return res.status(404).json({ message: "404 request error" });
  });
  app.use(globalErrorHandling)
  connectDB();
  deleteUserFromCloud()
};
export default initApp;
