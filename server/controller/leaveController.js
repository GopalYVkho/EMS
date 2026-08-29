import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";

const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, fromDate, toDate, description } = req.body;
    const employee = await Employee.findOne({ userId });
    const leaveAdd = new Leave({
      employeeId: employee._id,
      leaveType,
      fromDate,
      toDate,
      description,
    });
    await leaveAdd.save();

    return res.status(200).json({ success: true });
  } catch {
    return res.status(500).json({ success: true, erro: "Server error" });
  }
};

const LeaveIndex = async (req, res) => {
  try {
    const { id } = req.params;
    let leaveList = await Leave.find({employeeId:id});
    if(!leaveList){
      const employee = await Employee.findOne({ userId: id });
      leaveList = await Leave.find({ employeeId: employee._id });
    }
    
    return res.status(200).json({ success: true, leaveList });
  } catch {
    return res.status(500).json({ success: true, erro: "Server error" });
  }
};

const LeaveIndexAdmin = async (req, res) => {
  try {
    const leave = await Leave.find().populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select: "departmentName",
        },
        {
          path: "userId",
          select: "name",
        },
      ],
    });

    return res.status(200).json({ success: true, leave });
  } catch(error) {
    console.log(error)
    return res.status(500).json({ success: true, erro: "Server error" });
  }
};


const LeaveDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findById({_id:id}).populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select: "departmentName",
        },
        {
          path: "userId",
          select: "name profileImage email",
        },
      ],
    });

    return res.status(200).json({ success: true, leave });
  } catch(error) {
    console.log(error)
    return res.status(500).json({ success: true, error: "Server error" });
  }
};

const LeaveApprove = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findByIdAndUpdate({_id:id},{status:req.body.status});
    if(!leave){
      return res.status(400).json({ success: false, error: "Server error" });
    }

    return res.status(200).json({ success: true });
  } catch(error) {
    console.log(error)
    return res.status(500).json({ success: true, error: "Server error" });
  }
};


export { addLeave, LeaveIndex, LeaveIndexAdmin,LeaveDetails,LeaveApprove };
