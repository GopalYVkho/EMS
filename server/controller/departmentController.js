import Department from "../models/Department.js";

const getDepartment = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ success: true, departments });
  } catch {
    return res.status(500).json({ success: false, error: "server error" });
  }
};

const getDepartmentsingle = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById({ _id: id });

    return res.status(200).json({ success: true, department });
  } catch {
    return res.status(500).json({ success: false, error: "server error" });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { departmentName, description } = req.body;

    const department = await Department.findByIdAndUpdate(
      id,
      { departmentName, description, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!department) {
      return res
        .status(404)
        .json({ success: false, error: "Department not found" });
    }

    return res.status(200).json({ success: true, department });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: "server error" });
  }
};

const addDepartment = async (req, res) => {
  try {
    const { departmentName, description } = req.body;
    const newDep = new Department({
      departmentName,
      description,
    });

    await newDep.save();
    return res.status(200).json({ success: true, department: newDep });
  } catch (error) {
    return res.status(500).json({ success: false, error: "server error" });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById({
      _id: id,
    });
    await department.deleteOne();
    return res.status(200).json({ success: true, department });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: "server error" });
  }
};
export {
  addDepartment,
  getDepartment,
  getDepartmentsingle,
  updateDepartment,
  deleteDepartment,
};
