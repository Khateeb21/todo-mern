const router = require("express").Router()
const User = require("../models/user")
const List = require("../models/list")



router.post("/addTask", async (req, res) => {
    try {

        const { title, body,ID } = req.body
    
   
        
        const existingUser = await User.findById(ID)
        
        if (existingUser) {

            console.log(existingUser)
            const list = new List({ title, body, user: existingUser })



            await list.save().then(() => {

                res.status(200).json({ list })

            });
            existingUser.list.push(list)
            existingUser.save()
        }
    }
    catch (error) {
        console.log(error)
    }
}
)


router.put("/updateTask/:id", async (req, res) => {
    try {
        const { idss, inputs } = req.body; 
        const { title, body } = inputs;
   
        const existingUser = await User.findById(req.params.id);
        if (existingUser) {

            const list = await List.findByIdAndUpdate(idss, { title, body });
            list.save().then(() => res.status(200).json({ message: "Task updated " }))
        }
    }
    catch (error) {
        console.log(error)
    }
}
)

router.delete("/deleteTask/:id", async (req, res) => {
    try {
        console.log(req.params.id)
        console.log(req.query.idss)
        const  ids  = req.query.idss
        const existingUser = await User.findByIdAndUpdate(
            req.params.id,
            { $pull: { list:ids} }, 
            { new: true } 
        );
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const deleteTask = await List.findByIdAndDelete(ids);
        

        return res.status(200).json({ message: "Task deleted" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
});

router.get('/getTasks/:id', async (req, res) => {

    const list = await List.find({ user: req.params.id }).sort({createdAt:-1})
    console.log(list)
    res.status(200).json({ list })


})



module.exports = router