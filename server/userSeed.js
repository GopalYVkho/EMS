import connectToDatabase from "./db/db.js";
import User from "./models/User.js";
import bcrypt from "bcrypt";

const userRegister = async () => {
  try {
    await connectToDatabase();
    const hashPassword = await bcrypt.hash("admin", 10);
    const newUser = new User({
      name: "Admin",
      email: "innod817@gmail.com",
      password: hashPassword,
      role: "admin",
    });

    await newUser.save();
  } catch (error) {
    console.log(error);
  }
};

userRegister();
