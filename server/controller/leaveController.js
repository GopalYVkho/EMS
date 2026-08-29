import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";

const addLeave = async (req, res) => {
  try {
    const { userId,leaveType, fromDate, toDate, description } = req.body;
    const employee = await Employee.findOne({userId});
    const leaveAdd = new Leave({
        employeeId:employee._id,leaveType, fromDate, toDate, description
    })
    await leaveAdd.save();

    return res.status(200).json({success:true})

  } catch {
    return res.status(500).json({success:true,erro:"Server error"})
  }
};

const LeaveIndex = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findOne({userId:id});
    const leaveList = await Leave.find({employeeId:employee._id});
    return res.status(200).json({success:true,leaveList})

  } catch {
    return res.status(500).json({success:true,erro:"Server error"})
  }
};

export { addLeave,LeaveIndex };
