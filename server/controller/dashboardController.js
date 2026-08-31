import Department from "../models/Department.js";
import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";

const adminDashboard = async(req,res)=>{
    try{
        const totalEmployee = await Employee.countDocuments();
        const totalDepartment = await Department.countDocuments();
        const totalSalaries = await Employee.aggregate([
            {
                $group:{_id:null,totalSalary:{$sum:"$salary"}}
            }
        ])

        const leaveApplied =await Leave.distinct('employeeId')
        const leaveStatus = await Leave.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ])

        const leaveSummary ={
            appliedFor:leaveApplied.length,
            approved:leaveStatus.find(item=>item._id==="Approved")?.count || 0,
            rejected:leaveStatus.find(item=>item._id==="Rejected")?.count || 0,
            pending:leaveStatus.find(item=>item._id==="Pending")?.count || 0,
        }

        return res.status(200).json({
            success:true,
            totalEmployee,
            totalDepartment,
            totalSalary:totalSalaries[0]?.totalSalary||0,
            leaveSummary
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            error:"dashboard server error",
            aaa:error,
        })
    }
}


export { adminDashboard };
