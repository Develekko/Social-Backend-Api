import commentModel from "../../../../DB/models/comment.model.js";
import postModel from "../../../../DB/models/post.model.js";
import replyModel from "../../../../DB/models/reply.model.js";
import cloudinary from "../../../Utlis/cloudinary.js";
import { asyncHandler } from "../../../Utlis/ErrorHandeling.js";

// Add Reply
export const addReply = asyncHandler(async(req,res,next)=>{
    const comment = await commentModel.findOne({_id:req.params.comment_id,postId:req.params.post_id,isDeleted:false}).populate([
        {
            path:'postId',
            select:'_id'
        }
    ])
    if(!comment)
    {
        return next(new Error("Invalid comment or post ID", { cause: 404 }));
    }
    if(!comment.postId)
    {
        return next(new Error("Post ID is not Exist", { cause: 404 }));
    }
    req.body.postId = req.params.post_id
    req.body.commentId = req.params.comment_id
    req.body.userId = req.user._id
    if(req.file)
    {
        const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
            folder:`${process.env.APP_NAME}/posts/${comment.postId.id}/comments/replies`
        })
        req.body.image = {secure_url,public_id}
    }
    const reply = await replyModel.create(req.body)
    return res.status(201).json({ status: "success", message: "Reply created Successfully", reply });
})

// Update Reply
export const updateReply = asyncHandler(async(req,res,next)=>{
    const reply = await replyModel.findOne({_id:req.params.reply_id,commentId:req.params.comment_id,postId:req.params.post_id,isDeleted:false}).populate([
        {
            path:'postId',
            select:'_id'
        },
        {
            path:'commentId',
            select:'_id'
        }
    ])
    if(!reply)
    {
        return next(new Error("Invalid Reply or commecnt or post ID", { cause: 404 }));
    }
    if(!reply.commentId)
    {
        return next(new Error("Comment ID not Exist", { cause: 404 }));
    }
    if(!reply.postId)
    {
        return next(new Error("Post ID not Exist", { cause: 404 }));
    }
    if(!reply.userId.equals(req.user._id))
    {
        return next(new Error("You are not the owner of the Reply", { cause: 403 }));
    }
    reply.text = req.body.text
    if(req.file)
    {
        const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
            folder:`${process.env.APP_NAME}/posts/${reply.postId.id}/comments/replies`
        })
        if(reply.image?.public_id)
        {
            await cloudinary.uploader.destroy(reply.image.public_id)
        }
        reply.image = {secure_url,public_id}
    }
    await reply.save()
    return res.status(200).json({ status: "success", message: "Reply Updated Successfully", reply });
})

// Delete Reply
export const deleteReply = asyncHandler(async (req, res, next) => {
    const reply = await replyModel.findOne({_id:req.params.reply_id,commentId:req.params.comment_id,postId:req.params.post_id,isDeleted:false}).populate([
        {
            path:'postId',
            select:'_id'
        },
        {
            path:'commentId',
            select:'_id'
        }
    ])
    if(!reply)
    {
        return next(new Error("Invalid Reply or commecnt or post ID", { cause: 404 }));
    }
    if(!reply.commentId)
    {
        return next(new Error("Comment ID not Exist", { cause: 404 }));
    }
    if(!reply.postId)
    {
        return next(new Error("Post ID not Exist", { cause: 404 }));
    }
    if(!reply.userId.equals(req.user._id))
    {
        return next(new Error("You are not the owner of the Reply", { cause: 403 }));
    }
    reply.isDeleted = true
    await reply.save()
    return res
      .status(200)
      .json({ status: "success", message: "Reply Deleted Successfully" });
  });

// Like Reply
export const likeReply = asyncHandler(async (req, res, next) => {
    const reply = await replyModel.findOne({_id:req.params.reply_id,commentId:req.params.comment_id,postId:req.params.post_id,isDeleted:false})
    .populate([{path:'postId',select:'_id'},{path:'commentId',select:'_id'}])
    if(!reply)
    {
        return next(new Error("Invalid Reply or commecnt or post ID", { cause: 404 }));
    }
    if(!reply.commentId)
    {
        return next(new Error("Comment ID not Exist", { cause: 404 }));
    }
    if(!reply.postId)
    {
        return next(new Error("Post ID not Exist", { cause: 404 }));
    }
    for (const react of Object.keys(reply.reactions)) {
        if(reply.reactions[react].includes(req.user._id))
        {
          reply.reactions[react].pull(req.user._id);
        }
      }
      reply.reactions[req.query.react].addToSet(req.user._id);
      await reply.save()
    return res.status(200).json({ status: "success", reply});
  });

// Un Like Reply
export const unlikeReply = asyncHandler(async (req, res, next) => {
    const reply = await replyModel.findOne({_id:req.params.reply_id,commentId:req.params.comment_id,postId:req.params.post_id,isDeleted:false})
    .populate([{path:'postId',select:'_id'},{path:'commentId',select:'_id'}])
    if(!reply)
    {
        return next(new Error("Invalid Reply or commecnt or post ID", { cause: 404 }));
    }
    if(!reply.commentId)
    {
        return next(new Error("Comment ID not Exist", { cause: 404 }));
    }
    if(!reply.postId)
    {
        return next(new Error("Post ID not Exist", { cause: 404 }));
    }
    for (const react of Object.keys(reply.reactions)) {
        if(reply.reactions[react].includes(req.user._id))
        {
          reply.reactions[react].pull(req.user._id);
        }
      }
      await reply.save()
    return res.status(200).json({ status: "success", reply});
  });