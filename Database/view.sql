CREATE VIEW getEmployee AS
SELECT e.Employee_Id,e.Full_Name,e.Gender,e.Country,pd.Job_Title,pd.Pay_Grade, WS.Work_Section
FROM Employee e
JOIN Professional_Details pd USING (employee_id)
JOIN Work_Section WS USING (Section_Id);
CREATE OR REPLACE VIEW total_employees_view AS
SELECT COUNT(*) AS totalEmployees FROM employees;

CREATE OR REPLACE VIEW leaves_taken_view AS
SELECT COUNT(*) AS leavesTaken FROM leaves WHERE status = 'approved';

CREATE OR REPLACE VIEW pending_leave_appeals_view AS
SELECT COUNT(*) AS pendingLeaveAppeals FROM leave_appeals WHERE status = 'pending';

CREATE OR REPLACE VIEW average_performance_view AS
SELECT AVG(performance_score) AS averagePerformance FROM performance_reviews;
