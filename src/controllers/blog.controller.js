import express from "express";
const  router = express.Router();
import Blog from "../models/blog.model.js";
import mongoose, {mongo, Types} from "mongoose";

router.get("/", async(req, res)=>{
    try{ 
        const page = +req.query?.page || 1;
        const limit = +req.query?.limit || 10;
         // Limit defaults to 10
        const skip = (page-1)*limit;
        const Blogs = await Blog.aggregate([{ '$facet' :{ info:[{$group:{_id:null, documents:{$sum:1}}},{ $addFields: { page: page }}], data: [ { $skip: skip }, { $limit: limit } ]} } ] );
        let totalDocs = Blogs[0]?.info[0]?.documents;
        const totalPages = Math.ceil(totalDocs/ limit);
        return res.send({error: false, data: Blogs, totalPages});

    }
    catch(e){
        res.send({error: true, message: e.message});
    }
});

router.patch("/:id", async(req, res)=>{
    try{
        let id = req.params?.id;
        id = Types.ObjectId(id);
        const blog =await Blog.findOne({_id: id});
        let str = blog.body;
        str = str.split(' ');
        let matched  = [];
        let changed = str.map(el=>{
            if(el[0]==='a' || el[0]==='A'){
                matched.push(el);
                let newStr = "";
                for(let i=0; i<el.length; i++){
                    if(i>el.length-3){
                        newStr+="*";
                    }
                    else{
                        newStr+=el[i];
                    }
                }
                return newStr;
            }
            return el;
        });
        changed = changed.join(" ");
       await Blog.updateOne({_id: id}, [{$set: {body: changed}}]);
        return res.send({error: false, matched});
    }
    catch(e){
        return res.send({error: true, message: e.message});
    }
})

export default router;
