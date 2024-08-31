const mongoose=require('mongoose')


const conn=async(req,res)=>{

    try {
        
    await mongoose.connect("mongodb+srv://khateebahmed4747:Rebelkhateeb123@cluster0.or3ftqw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{

        console.log("connection successful")

    })
        
    } catch (error) {
        
        res.status(400).json({
            message:"not connected"

                           
        })
    }



}
conn()