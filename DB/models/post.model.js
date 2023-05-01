import mongoose, { Schema, model, Types } from "mongoose";
const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    images: [{}],
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    reactions: {
      like: [{ type:Types.ObjectId, ref: 'User' }],
      celebrate: [{ type:Types.ObjectId, ref: 'User' }],
      support: [{ type:Types.ObjectId, ref: 'User' }],
      insightful: [{ type:Types.ObjectId, ref: 'User' }],
      funny: [{ type:Types.ObjectId, ref: 'User' }],
      love: [{ type:Types.ObjectId, ref: 'User' }]
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true , transform: function(doc, ret) {
      ret.id = undefined;
    } },
    toObject: { virtuals: true },
  }
);
postSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'postId'
})
postSchema.methods.react = function(userId, reaction) {
  this.reactions.set(userId, reaction);
  return this.save();
};
postSchema.pre("find", function () {
  this.where({ isDeleted: false });
});
const postModel = mongoose.models.Post || model("Post", postSchema);
export default postModel;
