import userRouter from './modules/user/user.router.js' 
import authRouter from './modules/auth/auth.router.js' 
import adminRouter from './modules/admin/admin.router.js' 
import postRouter from  './modules/post/post.router.js'
import connectDB from '../DB/connection.js' 
import cors from 'cors' 
import { globalErrorHandling } from './Utlis/ErrorHandeling.js' 
import { deleteUserFromCloud } from './Utlis/cronJob.js'
const initApp = (express, app) => {
  app.use(cors())
  app.use(express.json({}));
  app.get('/',(req,res,next)=>{
    return res.status(200).json({status:"Success",message:"welcome to social-backend-api"})
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
