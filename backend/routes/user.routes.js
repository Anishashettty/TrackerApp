const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const userController = require("../src/components/User/user.controllers");
const User = require("../src/components/User/user");
const bcrypt = require("bcrypt")
const { verifyToken } = require("../middleware/auth.middleware");

router.post("/", verifyToken, userController.createUser);
router.get("/", verifyToken, userController.getUsers);
router.put("/:id", verifyToken, userController.updateUser);
router.delete("/:id", verifyToken, userController.deleteUser);
router.patch("/:id/permissions", verifyToken, userController.togglePermission);
router.get("/export", verifyToken, userController.exportUsers);
router.post("/import", verifyToken, upload.single("file"), userController.importUsers);
// initially admin (add  first using postman)
router.post("/init-admin", async (req, res) => {
  try {
    const existingAdmin = await User.findOne({ role: "admin" });

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const admin = new User({
      ...req.body,
      password: hashedPassword,
      role: "super-admin",
    });

    await admin.save();

    res.json({ message: "Admin created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//==============First method (using chunk)==============
// router.post("/infinite",async(req,res)=>{
//   for(let i=0;i<10000000000;i++){
   
//   } 
//   return res.json({message: " slow done"})
// })


// ==============First method (using chunk)==============
// router.post("/infinite",async(req,res)=>{
//   for(let i=0;i<10000000000;i++){
//    await new Promise(reslove=>setTimeout(reslove,1000))
//    console.log(i)
//   }
//   return res.json({message: " slow done"})
// })



// ===============Second method(using chunk) ==============

// router.post("/infinite", async (req, res) => {

//   let i = 0;

//   function processChunk() {
//     let count = 0;

//     // do small work
//     while (count < 100000 && i < 1000000000) {
//       i++;
//       count++;
//     }

    
//     if (i < 1000000000) {
//       setImmediate(processChunk);
//     } else {
//       res.json({ message: "Done without blocking" });
//     }
//   }

//   processChunk(); // start first chunk
// });

//=====Third method (using worker thread) =============
const {Worker } = require("worker_threads");
const path= require("path");

  router.post("/infinite",async(req,res)=>{
    const worker = new Worker(path.join(__dirname,"worker.js"));
 


    worker.on("message",(result)=>{
      res.json({message:result})
    })
    
    worker.on("error",(err)=>{
      res.status(500).json({message:err.message})
    })

  })

// Simulate a fast operation
router.post("/fast", async(req,res)=>{
  
return res.json({ message: "fast Done" })
})

module.exports = router;
