import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, error: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({ success: false, error: "User Not Found" });
    }

    const token = jwt.sign({_id:user._id,role:user.role},process.env.JWT_KEY,{expiresIn:"10d"});

    res.status(200).json({success:true,
        token,
        user:{
            _id:user._id,
            name:user.name,
            role:user.role
        }
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

export { Login };
