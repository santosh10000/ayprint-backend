import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", async function (req, res, next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log(`password is ` + this.password);
    // next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function (userPassword) {
  try {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    console.log(this.password, userPassword);
    console.log(`I got called`);

    console.log(isMatch);
    return isMatch;
  } catch (error) {
    console.log(error);
  }
};

UserSchema.methods.createJWT = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });
    console.log(`I als o got called`);
    console.log(token);
    return token;
  } catch (error) {
    console.log(error);
  }
};

const User = new mongoose.model("User", UserSchema);
export { User };
