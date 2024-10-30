CREATE VIEW Authenticate_data AS
SELECT e.Employee_ID, u.User_ID, u.User_Password, p.Pay_Grade, p.Job_Title
FROM Employee e
JOIN User_Account u USING (Employee_ID)
JOIN Professional_Details p USING (Employee_ID);

-- ----------------------------------------------------
CREATE VIEW getEmployee AS
SELECT e.Employee_Id,e.Full_Name,e.Gender,e.Country,pd.Job_Title,pd.Pay_Grade, WS.Work_Section
FROM Employee e
JOIN Professional_Details pd USING (employee_id)
JOIN Work_Section WS USING (Section_Id);


-- -----------------------------------------------------
DROP VIEW IF EXISTS getPastDetails;
CREATE VIEW getPastDetails AS
SELECT 
    e.Employee_Id AS Employee_ID,
    pd.Job_Title AS Current_Job_Title,
    pjp.Job_Title AS Past_Job_Title,
    pjp.Time_Period_Years,
    pjp.Rating_Performance
FROM 
    Employee e
JOIN 
    Professional_Details pd ON e.Employee_Id = pd.Employee_Id
LEFT JOIN 
    Past_Job_Positions pjp ON e.Employee_Id = pjp.Employee_Id;
-- ----------------------------------------------

DROP VIEW IF EXISTS Employee_Work_Details;
CREATE VIEW Employee_Work_Details AS
SELECT 
    e.Employee_Id,
    ws.Work_Section,
    ws.Department_Mail,
    b.Branch_name,
    b.Country,
    b.Location
FROM 
    Employee e
JOIN 
    Professional_Details pd ON e.Employee_Id = pd.Employee_Id
JOIN 
    Work_Section ws ON pd.Section_Id = ws.Section_Id
JOIN 
    Branch b ON ws.Branch_Id = b.Branch_Id;
-- ---------------------------------------------

DROP VIEW IF EXISTS LeaveMax;
CREATE VIEW LeaveMax AS
SELECT 
    pd.Employee_Id,
    pd.Pay_Grade,
    mlc.Annual_Leave_Count,
    mlc.Casual_Leave_Count,
    mlc.Maternity_Leave_Count,
    mlc.No_Pay_Leave_Count
FROM 
    Professional_Details pd
JOIN 
    Maximum_Leave_Count mlc ON pd.Pay_Grade = mlc.Pay_Grade;
-- --------------------------------------------------

DROP VIEW IF EXISTS Profileinfo;
CREATE VIEW Profileinfo AS
SELECT 
    e.Employee_Id,
    e.Full_Name,
    pd.Job_Title,
    pd.Employment_Status,
    pd.Company_Work_Mail
FROM 
    Employee e
JOIN 
    Professional_Details pd ON e.Employee_Id = pd.Employee_Id;
-- ---------------------------------------------------


DROP VIEW IF EXISTS SectionBranchLanView;
CREATE VIEW SectionBranchLanView AS
SELECT 
    ws.Section_Id,
    ws.Branch_Id,
    sci.Section_Lan_Number,
    bci.Branch_Lan_Number
FROM 
    Work_Section ws
JOIN 
    Section_Contact_Info sci ON ws.Section_Id = sci.Section_Id
JOIN 
    Branch_Contact_Info bci ON ws.Branch_Id = bci.Branch_Id;

-- ------------------------------------------------------

CREATE VIEW Adminview AS
SELECT Employee_Id, Role
FROM User_Account;

