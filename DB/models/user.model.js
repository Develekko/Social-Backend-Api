import mongoose, { Schema, Types, model } from "mongoose";
import postModel from "./post.model.js";
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    headline:String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    images: {
      profile:Object,
      cover:Object
    },
    otp: String,
    otpexp: Date,
    status: {
      type: String,
      default: "offline",
      enum: ["offline", "online"],
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user"],
    },
    gender: {
      type: String,
      default: "male",
      enum: ["male", "female"],
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    connections:{
      requested: [{ type:Types.ObjectId, ref: 'User' }],
      accepted: [{ type:Types.ObjectId, ref: 'User' }],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    permanentlyDeleted: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true , transform: function(doc, ret) {
      ret.id = undefined;
    } },
    toObject: { virtuals: true },
  }
);
userSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'userId'
})
userSchema.pre("find", function () {
  this.where({ isDeleted: false });
});
userSchema.index({ permanentlyDeleted: 1 }, { expireAfterSeconds: 0 });
const userModel = mongoose.models.User || model("User", userSchema);
export default userModel;