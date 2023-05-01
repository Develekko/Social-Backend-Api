import postModel from "../../../../DB/models/post.model.js";
import userModel from "../../../../DB/models/user.model.js";
import cloudinary from "../../../Utlis/cloudinary.js";
import { asyncHandler } from "../../../Utlis/ErrorHandeling.js";
import reactionList from "../../../Utlis/reactionList.js";

//Get All Posts with in connection list only 
export const getAllPosts = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.user._id)
  const Allposts = await postModel.find({$or:[{userId: { $in: user.connections.accepted}},{userId:req.user._id}],isPrivate:false}).populate([
    {
      path: "userId",
      select: "name images.profile.url",
    },
    ...reactionList,
    {
      path:'comments',
      select:'text userId like unlike replies',
      populate:[
        {
          path: "userId",
          select: "name images.profile.url",
        },
        ...reactionList,
        {
          path: "replies",
          select:'text userId like unlike',
          populate:[
            {
              path: "userId",
              select: "name images.profile.url",
            },
            ...reactionList,
          ]
        }
      ]
    }
  ])
  const posts = Allposts.filter(post=>post.userId!=null)
  return res.status(200).json({ status: "success", posts_count: posts.length, results: posts });
});
//Get All Posts with in connect ion list only 
export const getAllPostsOwner = asyncHandler(async (req, res, next) => {
  const posts = await postModel.find({userId:req.user._id}).populate([
    {
      path: "userId",
      select: "name images.profile.url",
    },
    ...reactionList,
    {
      path:'comments',
      select:'text userId like unlike replies',
      populate:[
        {
          path: "userId",
          select: "name images.profile.url",
        },
        ...reactionList,
        {
          path: "replies",
          select:'text userId like unlike',
          populate:[
            {
              path: "userId",
              select: "name images.profile.url",
            },
            ...reactionList,
          ]
        }
      ]
    }
  ]);
  return res
    .status(200)
    .json({ status: "success", posts_count: posts.length, results: posts });
});
//Get All Posts with in connection list only 
export const getAllPostsPublicUser = asyncHandler(async (req, res, next) => {
  const user = await userModel.findOne({_id:req.params.userId,isDeleted:false})
  if(!user)
  {
    return next(new Error('User Id is not Exist',{cause:404}))
  }
  const posts = await postModel.find({userId:req.params.userId,isPrivate:false}).populate([
    {
      path: "userId",
      select: "name images.profile.url",
    },
    ...reactionList,
    {
      path:'comments',
      select:'text userId like unlike replies',
      populate:[
        {
          path: "userId",
          select: "name images.profile.url",
        },
        ...reactionList,
        {
          path: "replies",
          select:'text userId like unlike',
          populate:[
            {
              path: "userId",
              select: "name images.profile.url",
            },
            ...reactionList,
          ]
        }
      ]
    }
  ]);
  return res
    .status(200)
    .json({ status: "success", posts_count: posts.length, results: posts });
});
//Add Post
export const addPost = asyncHandler(async (req, res, next) => {
  const { title } = req.body;
  let post = await postModel.create({ title, userId: req.user._id });
  if (req.files.length != 0) {
    for (const file of req.files) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        file.path,
        { folder: `${process.env.APP_NAME}/posts/${post._id}/images` }
      );
      post = await postModel.findByIdAndUpdate(
        post._id,
        { $push: { images: { url: secure_url, public_id } } },
        { new: true }
      );
    }
  }
  return res
    .status(201)
    .json({ status: "success", message: "Post created Successfully", post });
});
//Update Post
export const updatePost = asyncHandler(async (req, res, next) => {
  const { title } = req.body;
  if (!(await postModel.findById(req.params.post_id))) {
    return next(new Error("Post ID not Exist", { cause: 404 }));
  }
  let post = await postModel.findOneAndUpdate(
    { _id: req.params.post_id, userId: req.user._id },
    { title }
  );
  if (req.files.length != 0) {
    post.images = [];
    await post.save();
    await cloudinary.api.delete_resources_by_prefix(`posts/${post._id}`);
    for (const file of req.files) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        file.path,
        { folder: `${process.env.APP_NAME}/posts/${post._id}/images` }
      );
      post.images.push({ url: secure_url, public_id });
    }
  }
  await post.save();
  return res
    .status(200)
    .json({ status: "success", message: "Post Updated Successfully"});
});
// Delete Post
export const deletePost = asyncHandler(async (req, res, next) => {
  if (!(await postModel.findById(req.params.post_id))) {
    return next(new Error("Post ID not Exist", { cause: 404 }));
  }
  const post = await postModel.findOneAndUpdate(
    { _id: req.params.post_id, userId: req.user._id },
    { isDeleted: true }
  );
  if (!post) {
    return next(new Error("you are not the owner of the post", { cause: 403 }));
  }
  return res
    .status(200)
    .json({ status: "success", message: "Post Deleted Successfully" });
});
// Like Post
export const likePost = asyncHandler(async (req, res, next) => {
  const post = await postModel.findById(req.params.post_id)
  if (!post) {
    return next(new Error("Post ID not exist", { cause: 404 }));
  }
  for (const react of Object.keys(post.reactions)) {
    if(post.reactions[1].includes(req.user._id))
    {
      post.reactions[react].pull(req.user._id);
    }
  }
  post.reactions[req.query.react].addToSet(req.user._id);
  await post.save()
  return res.status(200).json({ status: "success", post });
});
// Un Like Post
export const unlikePost = asyncHandler(async (req, res, next) => {
  const post = await postModel.findById(req.params.post_id)
  if (!post) {
    return next(new Error("Post ID not exist", { cause: 404 }));
  }
  for (const react of Object.keys(post.reactions)) {
    if(post.reactions[react].includes(req.user._id))
    {
      post.reactions[react].pull(req.user._id);
    }
  }
  await post.save()
  return res.status(200).json({ status: "success", post });
});
// Private Post
export const privatePost = asyncHandler(async (req, res, next) => {
  const post = await postModel.findOneAndUpdate({_id:req.params.post_id,userId:req.user._id},{isPrivate:req.query.privacy},{new:true}).select('isPrivate')
  if(!post)
  {
    return next(new Error('you are not the owner of the post',{cause:403}))
  }
  return res.status(200).json({ status: "success", post });
});
