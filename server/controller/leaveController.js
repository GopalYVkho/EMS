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

    return res.status(200).json({suceess:true})

  } catch {
    return res.status(500).json({suceess:true,erro:"Server error"})
  }
};

export { addLeave };
