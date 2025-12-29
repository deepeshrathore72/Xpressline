const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const session = require("express-session")
const { jwtDecode } = require("jwt-decode");
const nodemailer = require("nodemailer");
const stripe = require('stripe')(process.env.STRIPE_PAYMENT_INTENT_SECRET);

async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(error.message);
  }
}
dbConnect();
app.use(morgan("tiny"));
app.use(cors())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  passReqToCallback: true
},
  function (request, accessToken, refreshToken, profile, done) {
    console.log(profile);
    return done(null, profile);
  }
));

const UserSchema = new mongoose.Schema({
  // _id: new mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // required: function() {
    //   // Require password if not using Google login
    //   return !this.googleId;
    // },
  },
  googleId: String,
  displayName: String,
  number: {
    type: Number,

    unique: true,
  },
  verify: {
    type: Boolean,
    default: false,
  },

  // required: function() {
  //   // Require password if not using Google login
  //   return !this.googleId;
  // },
})
const User = mongoose.model("User", UserSchema)


const OrderSchema = new mongoose.Schema({
  // _id: new mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  number: Number,
  address: String,
})
const Order = mongoose.model("Order", OrderSchema)


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hhrx0040@gmail.com",
    pass: "uwowywehbhyexvpc",
  },
});

app.post("/reset-password", async (req, res) => {
  console.log(req.body.email);
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send({ message: "User does not exist" });
  try {
    const resetToken = jwt.sign({ email: req.body.email }, "This is Taylor Swift", { expiresIn: "24h" });
    console.log(resetToken);
    const resetLink = `http://localhost:3000/update-password?token=${resetToken}`; // Correctly construct the reset link
    const mailOptions = {
      from: "hhrx0040@gmail.com",
      to: req.body.email, // Use the email provided in the request body
      subject: "Reset Password",
      html: `<h2>Please click on the given link to reset your password</h2>
      <p>${resetLink}</p>`
    };
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: "Reset Link Sent Successfully", token: resetToken });
  } catch (error) {
    console.error("Error sending mail:", error.message);
    res.status(500).send({
      message: "Error sending mail"
    });
  }
});


app.patch("/update-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  console.log(token);
  console.log(`Token: ${token} Password: ${password}`);
  try {
    const decoded = jwt.verify(token, "This is Taylor Swift");
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate({ email: decoded.email }, { password: hashedPassword });
    res.status(200).send({ message: "Password Updated Successfully" });
  } catch (error) {
    console.error("Error updating password:", error.message);
    res.status(500).send({
      message: "Error updating password",
    });
  }
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.data.email });
    if (user) return res.status(400).send({ message: "Email already exists in database" });
    const user2 = await User.findOne({ number: req.body.data.number });
    if (user2) return res.status(400).send({ message: "Number already exists in database" });
    const pass = req.body.data.password;
    const hashedPassword = await bcrypt.hash(pass, 10);
    const newUser = new User({
      // _id:new mongoose.Types.ObjectId(),
      name: req.body.data.name,
      email: req.body.data.email,
      password: hashedPassword,
      number: req.body.data.number,
    });
    await newUser.save();
    res.status(200).send({ message: "User Created Successfully" });
  }
  catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).send({
      message: "Error creating user",
      error: error.message,
    });
  }
})

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.post("/api/auth/login", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ error: "User does not exist" });
    }
    const passwordCheck = await bcrypt.compare(req.body.password, user.password);
    if (!passwordCheck) {
      return res.status(401).send({ error: "Password does not match" });
    }
    let token = jwt.sign({ username: user.name, email: user.email }, process.env.PRIVATEKEY, { expiresIn: "24h" })
    user.token = token;
    res.status(200).send({ message: "Login Successful", token: token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error finding user or other internal error" });
  }
});


app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/login" }),
  async function (req, res) {
    console.log(req.user.email);
    console.log(req.user.given_name);
    let token = jwt.sign({ username: req.user.given_name, email: req.user.email }, process.env.PRIVATEKEY, { expiresIn: "24h" })
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      const newUser = new User({
        name: req.user.displayName,
        email: req.user.email,
        googleId: req.user.id,
        displayName: req.user.displayName,
      });
      console.log(newUser);
      await newUser.save();
      newUser.token = token;
      // localStorage.setItem("token", token);
    }
    else {
      user.token = token;
    }
    console.log(token);
    res.redirect(`http://localhost:3000/loading?token=${token}`);
  }
);

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
})

app.post("/api/payment", async (req, res) => {
  console.log(req.body);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'INR',
        product_data: {
          name: 'Delivery Service',
          images: ['https://i.imgur.com/1R8wgvu.png'],
        },
        unit_amount: req.body.amount.unit_amount,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `http://localhost:3000/summary`,
    cancel_url: 'http://localhost:3000/progress',
    customer_email: req.body.email, // So Stripe links this payment to the user
    billing_address_collection: 'required', // Forces user to enter address in checkout
  });

  // console.log(CHECKOUT_SESSION_ID)
  const order = new Order({
    name: req.body.name,
    email: req.body.email,
    number: req.body.number,
    address: req.body.address,
  })
  await order.save();
  res.status(200).send({ url: session.url });
});

app.post('/check-payment-status/:sessionId', async (req, res) => {
  const { sessionId } = req.params;
  console.log(req.body)
  // console.log("reached 1")
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === 'paid') {
      // Payment was successful
      // console.log(session.payment_status)
      const mailOptions = {
        from: "hhrx0040@gmail.com",
        to: req.body.email,
        subject: "Order Details",
        html: `<h2>ORDER PLACED</h2>`
      };
      await transporter.sendMail(mailOptions);
      // const order=new Order({
      //   name:req.query.name,
      //   email:req.query.email,
      //   number:req.query.number,
      //   address:req.query.address,
      // })
      // await order.save();
      console.log("reached 2")
      res.status(200).send({ payment: session.payment_status });
    } else {
      // Payment was not successful
      res.status(400).json({ error: 'Payment was not successful ERROR2' });
    }
  } catch (error) {
    console.error('Error checking payment status:', error.message);
    res.redirect('http://localhost:3000/medicine');
  }
});

const sid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(sid, authToken);


app.post("/api/auth/verify", async (req, res) => {
  console.log("Verify", req.body);
  const otp = Math.floor(1000 + Math.random() * 9000);
  console.log(otp);
  const number = "+91" + req.body.number;
  console.log(number);
  client.messages.create({
    body: `The OTP for verification is ${otp}`,
    from: "+17088326715",
    to: number,
  }).then((message) => console.log(message.sid));
  res.status(200).send({ otp: otp });
})

app.post("/api/auth/verify2", async (req, res) => {
  try {
    console.log(req.body.data.verify)
    const updatedUser = await User.findOneAndUpdate({ number: req.body.data.number }, { verify: true });
    console.log(updatedUser);
    if (!updatedUser) {
      // Handle the case where the user with the specified number is not found
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "Verified" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
})

app.listen(3001, () => {
  console.log("Server is listening on port 3000");
});

// app.post("/create-payment-intent", async (req, res) => {
//   try {
//     // Create a PaymentIntent with the order amount and currency
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: 1000,
//       currency: "inr",
//       payment_method_types: ['card'],
//       receipt_email: '22322@iiitu.ac.in',
//     });

//     // Confirm the PaymentIntent with a payment method
//     const confirmedPaymentIntent = await stripe.paymentIntents.confirm(
//       paymentIntent.id,
//       { payment_method: "pm_card_visa" }
//     );

//     // If confirmation is successful, you can send the clientSecret to the client
//     res.status(200).send({ clientSecret: confirmedPaymentIntent.client_secret });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });




// app.post("/api/payment", async (req, res) => {
//   try{
//     const session=await stripe.checkout.sessions.create({
//       payment_method_types:["card"],
//       line_items:[{
//         price:{
//           currency:"INR",
//           product_data:{
//             name:"Medicine",
//           },
//           unit_amount: req.body.amount,
//         },
//         quantity:1,
//       }],
//       mode:"payment",
//       success_url:"http://localhost:3000/medicine",
//       cancel_url:"http://localhost:3000/progress",
//     });
//     res.status(200).send({url:session.url});
//   }
//   catch(error){
//     console.log(error);
//   }
// })
// Endpoint to check if payment was successful






// require("dotenv").config();
// const cors=require("cors");
// const connection = require("./db/dbConnect");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("./db/userModel");
// const app= require("express")();
// const authRoutes = require("./auth");
// const userRoutes = require("./users");
// const { mongo, default: mongoose } = require("mongoose");
// const express = require("express");
// connection();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// const corsOptions={
//   origin:"http://localhost:3000"
// }
// app.use(cors(corsOptions));

// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);

// app.listen(3000, () => {
//   console.log("Server is listening on port 3000");
// });












// /*
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//   );
//   next();
// });

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.post("/register", async (request, response) => {
//   const existingUser = await User.findOne({ email:request.body.email });
//   if (existingUser) {
//     return response.json({ message: "User already exists" });
//   }
//   try {
//     const hashedPassword = await bcrypt.hash(request.body.password, 10);
//     const user = new User({
//       _id:new mongoose.Types.ObjectId(),
//       name: request.body.name,
//       email: request.body.email,
//       password: hashedPassword,
//       number: request.body.number,
//     });

//     const result = await user.save();

//     response.status(201).send({
//       message: "User Created Successfully",
//       result,
//     });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     response.status(500).json({
//       message: "Error creating user",
//       error: error.message,
//     });
//   }
// });

// app.post("/login", (request, response) => {
//   // check if email exists
//   User.findOne({ email: request.body.email })

//     // if email exists
//     .then((user) => {
//       // compare the password entered and the hashed password found
//       bcrypt
//         .compare(request.body.password, user.password)

//         // if the passwords match
//         .then((passwordCheck) => {

//           // check if password matches
//           if(!passwordCheck) {
//             return response.status(400).send({
//               message: "Passwords does not match",
//               error,
//             });
//           }

//           //   create JWT token
//           const token = jwt.sign(
//             {
//               userId: user._id,
//               userEmail: user.email,
//             },
//             "RANDOM-TOKEN",
//             { expiresIn: "24h" }
//           );

//           //   return success response
//           response.status(200).send({
//             message: "Login Successful",
//             email: user.email,
//             token,
//           });
//         })
//         // catch error if password does not match
//         .catch((error) => {
//           response.status(400).send({
//             message: "Passwords does not match",
//             error,
//           });
//         });
//     })
//     // catch error if email does not exist
//     .catch((e) => {
//       response.status(404).send({
//         message: "Email not found",
//         e,
//       });
//     });
// });

// // free endpoint
// app.get("/free-endpoint", (request, response) => {
//   response.json({ message: "You are free to access me anytime" });
// });

// // authentication endpoint
// app.get("/auth-endpoint", auth, (request, response) => {
//   response.json({ message: "You are authorized to access me" });
// });

// app.listen(3000, () => {
//     console.log("Server is listening on port 3000");
//   });
//   */