import axios from "axios";

export const departmentCall = async () => {
    const token = localStorage.getItem("token");
    let department;
    try {
      const response = await axios.get(
        "http://localhost:3000/api/department",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if(response.data.departments){
        department = response.data.departments
      }
      console.log(response)

    } catch (error) {
      console.log(error.response);
    }

    return department;
  };

  export const employeeCall = async () => {
    const token = localStorage.getItem("token");
    let employee;
    try {
      const response = await axios.get(
        "http://localhost:3000/api/employee",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if(response.data.employee){
        employee = response.data.employee
      }
      console.log(response)

    } catch (error) {
      console.log(error.response);
    }

    return employee;
  };