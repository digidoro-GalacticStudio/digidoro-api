const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const crypto = require("crypto");
const debug = require("debug")("digidoro:user-model");

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    lastname: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password_hash: {
      type: String,
      trim: true,
      required: true,
    },
    date_birth: {
      type: Date,
      required: true, 
    },
    rols:{
      type: [String],
      trim: true,
      default: [],
    },
    salt:{
      type: String,
    },
    tokens:{
      type: [String],
      default:[]
    },
    profile_pic: {
      type: String,
      trim: true,
      default: "https://i.imgur.com/GvsgVco.jpeg",
    },
    point: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);


userSchema.methods = {
  encryptedPassword: function(password){
    if(!password) return "";

    try{
      const encryptedPassword = crypto.pbkdf2Sync(
        password,
        this.salt,
        1000, 64, 'sha512'
      ).toString("hex");

      return encryptedPassword;
    }
    catch(error){
      debug({error});
      return "";
    }
  },

  makeSalt: function(){
    return crypto.randomBytes(16).toString("hex");
  },

  comparePassword: function(password){
    return this.password_hash = this.encryptedPassword(password);
  }
}

userSchema.virtual("password")
  .set(function(password){
    if(!password) return;
    this.salt = this.makeSalt();
    this.password_hash = this.encryptedPassword(password);
  })
  
module.exports = mongoose.model("User", userSchema);
