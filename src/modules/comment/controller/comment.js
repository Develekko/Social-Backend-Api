import commentModel from "../../../../DB/models/comment.model.js";
import postModel from "../../../../DB/models/post.model.js";
import cloudinary from "../../../Utlis/cloudinary.js";
import { asyncHandler } from "../../../Utlis/ErrorHandeling.js";

// Add Comment
export const addComment = asyncHandler(async(req,res,next)=>{
    const post = await postModel.findOne({_id:req.params.post_id,isDeleted:false})
    if(!post)
    {
        return next(new Error("Invalid Post ID", { cause: 404 }));
    }
    req.body.postId = req.params.post_id
    req.body.userId = req.user._id
    if(req.file)
    {
        const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
            folder:`${process.env.APP_NAME}/posts/${post._id}/comments`
        })
        req.body.image = {secure_url,public_id}
    }
    const comment = await commentModel.create(req.body)
    return res.status(201).json({ status: "success", message: "Comment created Successfully", comment });
})

// Update comment
export const updateComment = asyncHandler(async(req,res,next)=>{
    const comment = await commentModel.findOne({_id:req.params.comment_id,postId:req.params.post_id}).populate([
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
        return next(new Error("Post ID not Exist", { cause: 404 }));
    }
    if(!comment.userId.equals(req.user._id))
    {
        return next(new Error("You are not the owner of the comment", { cause: 403 }));
    }
    comment.text = req.body.text
    if(req.file)
    {
        const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
            folder:`${process.env.APP_NAME}/posts/${comment.postId}/comments`
        })
        if(comment.image?.public_id)
        {
            await cloudinary.uploader.destroy(comment.image.public_id)
        }
        comment.image = {secure_url,public_id}
    }
    await comment.save()
    return res.status(200).json({ status: "success", message: "Comment Updated Successfully", comment });
})

// Delete comment
export const deleteComment = asyncHandler(async (req, res, next) => {
    const comment = await commentModel.findOne({_id:req.params.comment_id,postId:req.params.post_id}).populate([
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
        return next(new Error("Post ID not Exist", { cause: 404 }));
    }
    if(!comment.userId.equals(req.user._id))
    {
        return next(new Error("You are not the owner of the comment", { cause: 403 }));
    }
    comment.isDeleted = true
    await comment.save()
    return res
      .status(200)
      .json({ status: "success", message: "Comment Deleted Successfully" });
  });

// Like Comment
export const likeComment = asyncHandler(async (req, res, next) => {
    const comment = await commentModel.findOne({_id:req.params.comment_id,postId:req.params.post_id}).populate([
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
        return next(new Error("Post ID not Exist", { cause: 404 }));
    }
      for (const react of Object.keys(comment.reactions)) {
        if(comment.reactions[react].includes(req.user._id))
        {
          comment.reactions[react].pull(req.user._id);
        }
      }
      comment.reactions[req.query.react].addToSet(req.user._id);
      await comment.save()
    return res.status(200).json({ status: "success", comment});
  });
// Un Like Comment
export const unlikeComment = asyncHandler(async (req, res, next) => {
    const comment = await commentModel.findOne({_id:req.params.comment_id,postId:req.params.post_id}).populate([
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
        return next(new Error("Post ID not Exist", { cause: 404 }));
    }
      for (const react of Object.keys(comment.reactions)) {
        if(comment.reactions[react].includes(req.user._id))
        {
          comment.reactions[react].pull(req.user._id);
        }
      }
      await comment.save()
    return res.status(200).json({ status: "success", comment});
  });