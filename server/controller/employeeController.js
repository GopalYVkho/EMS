import Employee from "../models/Employee.js";
import User from "../models/User.js";
import multer from "multer";
import path from "path";
import bcrypt from "bcrypt";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "user already registered in empolyee" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
    });
    const savedUser = await newUser.save();

    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });

    await newEmployee.save();

    return res.status(200).json({ success: true, message: "employee created" });
  } catch (error) {
    return res.status(500).json({ success: false, error: "server error" });
  }
};

const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department");
    return res.status(200).json({ success: true, employee });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ success: false, error: "server error" });
  }
};

const getEmployeesingle = async (req, res) => {
  try {
    const { id } = req.params;
    let employee;
    employee = await Employee.findById({ _id: id })
      .populate("userId", { password: 0 })
      .populate("department");
    
    if(!employee){
      employee = await Employee.findOne({ userId: id })
      .populate("userId", { password: 0 })
      .populate("department");
    }

    return res.status(200).json({ success: true, employee });
  } catch {
    return res.status(500).json({ success: false, error: "server error" });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    const employee = await Employee.findById(id);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found" });
    }

    const user = await User.findById(employee.userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    user.name = name;
    user.email = email;
    user.role = role;

    if (password && password.trim() !== "") {
      user.password = await bcrypt.hash(password, 10);
    }

    if (req.file) {
      user.profileImage = req.file.filename;
    }

    await user.save();

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        employeeId,
        dob,
        gender,
        maritalStatus,
        designation,
        department,
        salary,
      },
      { new: true, runValidators: true }
    )
      .populate("userId", { password: 0 })
      .populate("department");

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.log("Update Error:", error);
    return res.status(500).json({ success: false, error: "server error" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete({
      _id: id,
    });
    return res.status(200).json({ success: true, employee });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: "server error" });
  }
};

const fetchEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employees = await Employee.find({
      department: id,
    });

    return res.status(200).json({ success: true, employees });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: "server error" });
  }
};

export {
  addEmployee,
  upload,
  getEmployee,
  getEmployeesingle,
  updateEmployee,
  deleteEmployee,
  fetchEmployeeById,
};
