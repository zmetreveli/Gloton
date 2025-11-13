const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../schema/usersSchema");
const jwtSecret = process.env.JWT_SECRET;
const { sendWelcomeEmail } = require("../service/index");
const authRouter = express.Router();

authRouter.post("/register", (req, res) => {
  const email = req.body.email;
  const data = req.body;


  if (!email) {
    return res.status(400).json({ error: { register: "Email not recieved" } });
  }
  User.findOne({ email: email })
    
    .then((user) => {
     
      if (user) {
        return res
          .status(400)
          .json({ error: { email: "Email already registered" } });
      }
      
      const newUser = new User({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        phone: data.phone,
        role: data.role,
    
      });

      newUser
        .save()
        .then((createdUser) => {
        
          const user = {
            email: "josegarcia1006@gmail.com",
            name: createdUser.firstName,
          };
          sendWelcomeEmail(user);
          return res.status(201).json({
            token: createdUser.generateJWT(),
            user: {
              email: createdUser.email,
              firstName: createdUser.firstName,
              _id: createdUser._id,
              role: createdUser.role,
            },
          });
        })
        .catch((err) => {
          return res.status(500).json({
            error: {
              message: "Error creating new User :(",
              details: err.message,
            },
          });
        });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

authRouter.post("/register-restaurant", (req, res) => {
  const email = req.body.email;
  const data = req.body;

  if (!email) {
    return res.status(400).json({ error: { register: "Email not recieved" } });
  }
  User.findOne({ email: email })
    
    .then((user) => {
      
      if (user) {
        return res
          .status(400)
          .json({ error: { email: "Email already registered" } });
      }
      
      const newUser = new User({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        role: "RESTAURANT",
      });

      newUser
        .save()
        .then((createdUser) => {
        

          return res.status(201).json({
            token: createdUser.generateJWT(),
            user: {
              email: createdUser.email,
              name: createdUser.name,
              id: createdUser._id,
              role: createdUser.role,
            },
          });
        })
        .catch((err) => {
          return res.status(500).json({
            error: {
              message: "Error creating new User :(",
              details: err.message,
            },
          });
        });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

authRouter.post("/login", async (req, res) => {
 
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: { login: "Missing email or password" } });
  }
  User.findOne({ email })
    .then((foundUser) => {
     
      if (!foundUser) {
        return res
          .status(400)
          .json({ error: { email: "User not found, please Register" } });
      }
     
      if (!foundUser.comparePassword(password)) {
      
        return res
          .status(400)
          .json({ error: { password: "Invalid Password" } });
      }
    
      return res.status(200).json({
        token: foundUser.generateJWT(),
        user: {
          email: foundUser.email,
          firstName: foundUser.firstName,
          _id: foundUser._id,
          role: foundUser.role,
          phone: foundUser.phone,
          address: foundUser.address,
          creditCard: foundUser.creditCard,
        },
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: {
          message: "Error creating new User :(",
          details: err.message,
        },
      });
    });
});

module.exports = authRouter;
