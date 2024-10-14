const db = require('../config/db');

const getAllLeaveReports = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Leave_Request WHERE Employee_Id='E0000001'";
    db.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  getAllLeaveReports
};
