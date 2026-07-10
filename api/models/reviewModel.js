import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    gigId:{type:String,required:true},
    userId:{type:String,required:true},
    star:{type:Number,required:true,enum:[1,2,3,4,5]},
    desc:{type:String,required:false},
   isSeller:{type:Boolean,default:false},
},{
    timestamps:true
});
export const ReviewModel =
  mongoose.models.ReviewModel ||
  mongoose.model("ReviewModel", reviewSchema);