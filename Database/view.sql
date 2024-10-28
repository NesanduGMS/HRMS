CREATE VIEW getEmployee AS
SELECT e.Employee_Id,e.Full_Name,e.Gender,e.Country,pd.Job_Title,pd.Pay_Grade, WS.Work_Section
FROM Employee e
JOIN Professional_Details pd USING (employee_id)
JOIN Work_Section WS USING (Section_Id);