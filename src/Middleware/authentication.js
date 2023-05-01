import userModel from '../../DB/models/user.model.js';
import { asyncHandler } from '../Utlis/ErrorHandeling.js';
import { verifyToken } from '../Utlis/TokenGenerator.js';

const auth = ({roles=['user']}={})=>{
  return asyncHandler(async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization?.startsWith(process.env.BARER_KEY)) {
      return next(new Error("You are not Authenticated",{cause:401}));
    }
    const token = authorization.split(process.env.BARER_KEY)[1];
    const decoded = verifyToken({ token });
    if (!decoded?.id) {
      return next(new Error("Invaild Token payload",{cause:406}));
    }
    const authUser = await userModel
      .findById(decoded.id)
      .select("name email password role isDeleted status confirmEmail isBlocked");
    if (!authUser) {
      return next(new Error("Not register account",{cause:404}));
    }
    if(!authUser.confirmEmail)
    {
      return next(new Error("You need to confirm Your Email First",{cause:409}));
    }
    if (authUser.isDeleted|| authUser.isBlocked) {
      return next(new Error("Your account suspended or removed , contact support for more information",{cause:403}));
    }
    if(authUser.status == 'offline')
    {
      return next(new Error("You are not logged in",{cause:409}));
    }
    if(!roles.includes(authUser.role))
    {
        return next(new Error("You are not Authorized",{cause:403}));
    }
    req.user = authUser;
    return next();
  });
}
export default auth;
