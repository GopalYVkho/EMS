import mongoose from "mongoose";
import Employee from "./Employee.js";
import Leave from "./Leave.js";
import Salary from "./Salary.js";

const departmentSchema = new mongoose.Schema({
    departmentName:{type:String,required: true},
    description:{type:String,required: true},
    createdAt: { type: String, default: Date.now },
    updatedAt: { type: String, default: Date.now },
})

departmentSchema.pre("deleteOne",{document:true,query:false},async function(next){
    try{
        const employee = await Employee.find({department:this._id});
        const empIds = employee.map(emp=>emp._id);
        
        await Employee.deleteMany({department:this._id});
        await Leave.deleteMany({employeeId:{$in:empIds}});
        await Salary.deleteMany({employeeId:{$in:empIds}});
    }catch(error){
        console.log(error)
    }
})

const Department = mongoose.model("Department",departmentSchema);

export default Department;