const mongoose = require("mongoose");
const validator = require("validator");
const brcypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, //remove trailing and spaces before
  },
  age: {
    type: Number,
    default: 18,
    //custom validation
    validate(value) {
      if (value <= 0) {
        throw new Error("Please enter a valid value of age");
      }
    },
  },

  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    validate(emailid) {
      if (!validator.isEmail(emailid)) {
        throw new Error("Please enter a valid email address");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(passvalue) {
      if (passvalue.toLowerCase().includes("password")) {
        throw new Error("Enter a different password");
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//accessible on instances
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "arandomstring");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
//accessible on models
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = await brcypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

//middlewares -> do something just before or after save/validate
//pre->for doing something before
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await brcypt.hash(user.password, 8);
  }

  next(); //used to signify end of one round
});

//User model
const User = mongoose.model("User", userSchema);
module.exports = User;
