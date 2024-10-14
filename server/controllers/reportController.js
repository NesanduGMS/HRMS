const { getAllLeaveReports } = require('../models/leaveReportModel');

const getLeaveReport = async (req, res) => {
  try {
    const reports = await getAllLeaveReports(); // Await the promise
    res.json(reports); // Send the results as a JSON response
  } catch (error) {
    console.error('Error fetching leave report:', error);
    res.status(500).json({ error: 'Error fetching leave report' });
  }
};

module.exports = {
  getLeaveReport,
};
