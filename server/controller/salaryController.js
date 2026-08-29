import Employee from "../models/Employee.js";
import Salary from "../models/Salary.js";

const addSalary = async (req, res) => {
  try {
    const { employee, basicSalary, allowances, deductions, payDate } = req.body;
    const totalSalary =
      parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);
    const newsalary = new Salary({
      employee,
      basicSalary,
      allowances,
      deductions,
      netSalary: totalSalary,
      payDate,
    });

    await newsalary.save();
    return res.status(200).json({ success: true });
  } catch {
    return res.status(500).json({ success: false, error: "server error" });
  }
};


const salaryHistory = async (req, res) => {
  try {
    const { id } = req.params;
    let salary = await Salary.find({employee:id}).populate('employee','employee');
    if(!salary||salary.length<1){
      const employee = await Employee.findOne({userId:id}); 
      salary = await Salary.find({employee:employee._id}).populate('employee','employee');
    }
    return res.status(200).json({ success: true,salary });
  } catch {
    return res.status(500).json({ success: false, error: "server error" });
  }
};



export { addSalary,salaryHistory };
