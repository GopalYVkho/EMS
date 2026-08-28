import mongoose, { Schema } from "mongoose";

const leaveSchema = new mongoose.Schema({
    employeeId: {type:Schema.Types.ObjectId,ref:"Employee",required:true},
    leaveType:{type:String,enum:["Sick Leave","Casual Leave","Annual Leave"],required: true},
    description:{type:String,required: true},
    fromDate:{type:Date},
    toDate:{type:Date},
    status:{type:String,enum:["Pending","Approved","Rejected"],default:"Pending"},
    createdAt: { type: String, default: Date.now },
    updatedAt: { type: String, default: Date.now },
})

const Leave = mongoose.model("Leave",leaveSchema);

export default Leave;