const db = require('../config/db'); // Make sure this uses mysql2/promise

const getAllLeaveReports = async () => {
  try {
    const query = "SELECT * FROM Leave_Request WHERE Employee_Id='E0000001'";
    const [results] = await db.query(query); // Use await for the query
    return results; // Return the results directly
  } catch (err) {
    throw err; // Rethrow the error to handle it in the controller
  }
};

module.exports = {
  getAllLeaveReports,
};
