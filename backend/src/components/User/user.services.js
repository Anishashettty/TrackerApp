const User = require("./user");
const crypto = require("crypto");
const nodemailer = require ("nodemailer")
const bcrypt = require("bcrypt");
const sendEmail = require("../../../utils/sendEmail");

// Create User
exports.createUser = async (data) => {
  const existing = await User.findOne({ email: data.email });

  if (existing) {
    throw new Error("Email already exists");
  }

  // const user = new User(data);
  // return await user.save();

  // generate password
  const plainPassword = crypto.randomBytes(6).toString("hex");

  //hash password 
  const hashedPassword = await  bcrypt.hash(plainPassword,10);

  //create a user 
  const user = new User({
    ...data,
    password : hashedPassword,
    permissions : data.permissions || []
    
  });

 const savedUser =  await user.save();

 //send email
 try {
  await sendEmail(data.email, plainPassword);
} catch (err) {
  console.error("Email failed for:", data.email, err.message);
}
 return savedUser;

};

// Get All Users
exports.getUsers = async () => {
  return await User.find().lean();
};

// Update User
exports.updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

// Delete User
exports.deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

// Toggle Permission
exports.togglePermission = async (id, type) => {
  const user = await User.findById(id);

  if (!user) throw new Error("User not found");

  let permissions = user.permissions || [];

  if (permissions.includes(type)) {
    permissions = permissions.filter(p => p !== type);
  } else {
    permissions.push(type);
  }

  user.permissions = permissions;
  return await user.save();
};