const LeaveReport = require('../models/leaveReportModel');

const getLeaveReport = async (req, res) => {
  try {
    const reportData = await LeaveReport.getAllLeaveReports();
    res.json(reportData);
  } catch (error) {
    console.error("Error fetching leave report:", error);   ///
    res.status(500).json({ message: 'Error fetching leave report', error });
  }
};

module.exports = {
  getLeaveReport
};
