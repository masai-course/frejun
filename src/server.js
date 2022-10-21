import app from "./index.js";
const PORT = process.env.PORT || 4000;
import connect from "./configs/db.js";

app.listen(PORT, async ()=>{
    try{
        await connect();
        console.log(`Server is running on PORT ${PORT}`);
    }
    catch(e){
        console.log("Cannot listen to server as errror occurring", e.message);
    }
});