const router=require("express").Router()
const User= require("../models/user")
const bcrypt=require("bcryptjs")


    router.post('/signin', async (req, res) => {
        try {
            let { usernameormail, password } = req.body;
            console.log(usernameormail)
             
            let email=''
            let username=''
              if (usernameormail.includes("@")){

                email=usernameormail

              }else{

                username=usernameormail
              }
            console.log('Received request with:', { email, username, password });
    
            const user = await User.findOne({
                $or: [
                    {  email },  
                    {  username }
                  ]
                });
         
            if (!user) {
            
                return res.status(200).json({ message: "Error: Authentication failed" });
            }
    
          
            const isMatch =  await bcrypt.compare(password, user.password)

                if (!isMatch) {
                    return res.status(200).json({ message: 'Password incorrect' });
                }
        
              
         
    
        
            const { password: userPassword, ...others } = user._doc;
            return res.status(200).json({ others,message:"login Successful" });
    
        } catch (error) {
       
            console.error('Error during signin process:', error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
    

      
    

       
    


module.exports=router