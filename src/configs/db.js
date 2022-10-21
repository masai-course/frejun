import {connect} from "mongoose";

export default ()=>{
    return connect(process.env.MONGO_URL);
}