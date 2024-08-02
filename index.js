const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("./Models/info");
const { generateToken } = require("./jwtUtils");
const bodyParser = require("body-parser");
const { validationResult } = require("express-validator");
const loginValidator = require("./validation");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
mongoose.connect(
  "mongodb+srv://nabeelsaji1:511UXWpFxl9g2GNM@cluster0.h4tfc.mongodb.net/imtiaz"
);

// const jwt = require('jsonwebtoken');
// const validateToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (authHeader) {
//     const token = authHeader.split(' ')[1]; // Bearer <token>

//     jwt.verify(token, '@123#qwe12', (err, payload) => {
//       if (err) {
//         return res.status(403).json({
//           success: false,
//           message: 'Invalid token',
//         });
//       } else {
//         req.user = payload;
//         next();
//       }
//     });
//   } else {
//     res.status(401).json({
//       success: false,
//       message: 'Token is not provided',
//     });
//   }
// };



app.post("/singup", async (req, res) => {
  // const errors = validationResult(req)
  // if(errors.isEmpty()){
  //     return res.status(200).json()
  // }
  // res.status(422).json({errors:errors.array()})
  try {
    const { email, password, confirmpassword } = req.body;
    console.log("🚀 ~ app.post ~ req.body:", req.body);
    // if(email===user.email && password===user.password){
    //     const token = generateToken(user)
    //     return res.json({
    //         success:true,
    //         message:'Authentication successful',
    //         token: token,
    //     });
    // } else{
    //     return res.status(401).json({
    //         success:false,
    //         message:'Invalid username or password'
    //     })
    // }

    const data = await userModel.create({ email, password });
    console.log("🚀 ~ app.post ~ data:", data);
    return res.status(200).json({
      data,
      message: "Created Succesfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    console.log("🚀 ~ app.post ~ user:", user)
    if(!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }
    if (password === user.password) {
      const token = generateToken(user);
      return res.json({
        success: true,
        message: "Authentication successful",
        token: token,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.listen(3001, () => {
  console.log("server is runing");
});
