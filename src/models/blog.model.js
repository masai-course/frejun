import {Schema, model} from "mongoose";

const blogSchema = Schema({
    title:{type:String, required: true},
    body:{type:String, required: true},
    category:{type:String, required: true}
});

export default new model("blog", blogSchema);