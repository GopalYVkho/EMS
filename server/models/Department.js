import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    departmentName:{type:String,required: true},
    description:{type:String,required: true},
    createdAt: { type: String, default: Date.now },
    updatedAt: { type: String, default: Date.now },
})

const Department = mongoose.model("Department",departmentSchema);

export default Department;