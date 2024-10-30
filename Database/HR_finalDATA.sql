USE defaultdb;


-- Truncate all tables
TRUNCATE TABLE Branch;
TRUNCATE TABLE Branch_Contact_Info;
TRUNCATE TABLE Employee;
TRUNCATE TABLE User_Account;
TRUNCATE TABLE Employee_Contact_Info;
TRUNCATE TABLE Available_Leaves;
TRUNCATE TABLE Maximum_Leave_Count;
TRUNCATE TABLE Work_Section;
TRUNCATE TABLE Professional_Details;
TRUNCATE TABLE Past_Job_Positions;
TRUNCATE TABLE Section_Contact_Info;
TRUNCATE TABLE Emergency_Information;
TRUNCATE TABLE Customize_Employee_Attribute;
TRUNCATE TABLE Supervisor;
TRUNCATE TABLE Leave_Request;

-- Insert data into each table
-- (Continue with your INSERT statements)


-- Insert data into the Branch table
INSERT INTO Branch (Branch_Id, Branch_name, Country, Location) VALUES
('B001', 'Jupiter-SL1', 'Sri Lanka', 'Colombo'),
('B002', 'Jupiter-BD', 'Bangladesh', 'Dhaka'),
('B003', 'Jupiter-PK', 'Pakistan', 'Karachi'),
('B004', 'Jupiter-IND', 'India', 'Mumbai'),
('B005', 'Jupiter-UK', 'UK', 'London'),
('B006', 'Jupiter-AUS', 'Australia', 'Sydney');

-- Insert data into the Branch_Contact_Info table
INSERT INTO Branch_Contact_Info (Branch_Lan_Number, Branch_Id) VALUES
(114567890, 'B001'),
(880123456, 'B002'),
(921234567, 'B003'),
(912345678, 'B004'),
(441234567, 'B005'),
(611234567, 'B006');

-- Insert data into the Employee table
INSERT INTO Employee (Employee_Id, First_Name, Last_Name, Full_Name, Recruitment_Date, Date_Of_Birth, Gender, Marital_Status, Personal_Email, Country, Address) VALUES
('E0000001', 'John', 'Doe', 'John Doe', '2020-01-01', '1990-03-15', 'Male', TRUE, 'john.doe@example.com', 'Sri Lanka', '123 Main St, Colombo'),
('E0000002', 'Jane', 'Smith', 'Jane Smith', '2019-06-01', '1985-07-22', 'Female', FALSE, 'jane.smith@example.com', 'Bangladesh', '456 Park Ave, Dhaka'),
('E0000003', 'Michael', 'Brown', 'Michael Brown', '2018-09-15', '1982-11-03', 'Male', TRUE, 'michael.brown@example.com', 'Pakistan', '789 Hill St, Karachi'),
('E0000004', 'Emily', 'Jones', 'Emily Jones', '2021-03-10', '1995-12-20', 'Female', FALSE, 'emily.jones@example.com', 'India', '101 Lake Rd, Mumbai'),
('E0000005', 'Chris', 'Taylor', 'Chris Taylor', '2022-08-30', '1991-02-11', 'Male', TRUE, 'chris.taylor@example.com', 'UK', '202 River St, London'),
('E0000006', 'Sarah', 'Wilson', 'Sarah Wilson', '2023-05-25', '1993-10-14', 'Female', FALSE, 'sarah.wilson@example.com', 'Australia', '303 Ocean Dr, Sydney');
-- -----


-- ---------

-- Insert data into the User_Account table
-- INSERT INTO User_Account (User_Id, Employee_Id, User_Password, Profile_Pic,Role) VALUES
-- ('U0000001', 'E0000001', 'password123', NULL),
-- ('U0000002', 'E0000002', 'password456', NULL),
-- ('U0000003', 'E0000003', 'password789', NULL),
-- ('U0000004', 'E0000004', 'password101', NULL),
-- ('U0000005', 'E0000005', 'password202', NULL),
-- ('U0000006', 'E0000006', 'password303', NULL);

-- Insert data into the Employee_Contact_Info table
INSERT INTO Employee_Contact_Info (Employee_Mobile_Number, Employee_Id) VALUES
(777123456, 'E0000001'),
(778234567, 'E0000002'),
(779345678, 'E0000003'),
(770456789, 'E0000004'),
(771567890, 'E0000005'),
(772678901, 'E0000006');

-- Insert data into the Available_Leaves table
INSERT INTO Available_Leaves (Employee_Id, Annual_Leaves, Casual_Leaves, Maternity_Leaves, No_Pay_Leaves) VALUES
('E0000001', 20, 10, 0, 50),
('E0000002', 25, 8, 0, 50),
('E0000003', 15, 12, 0, 50),
('E0000004', 30, 10, 0, 50),
('E0000005', 22, 9, 0, 50),
('E0000006', 18, 11, 0, 50);

-- Insert data into the Maximum_Leave_Count table
INSERT INTO Maximum_Leave_Count (Pay_Grade, Annual_Leave_Count, Casual_Leave_Count, Maternity_Leave_Count, No_Pay_Leave_Count) VALUES
('L1', 30, 12, 0, 50),
('L2', 28, 10, 0, 50),
('L3', 25, 10, 0, 50),
('L4', 22, 9, 0, 50),
('L5', 20, 8, 0, 50),
('L6', 18, 7, 0, 50),
('L7', 30, 12, 0, 50),
('L8', 28, 10, 0, 50),
('L9', 25, 10, 0, 50),
('L10', 22, 9, 0, 50),
('L11', 20, 8, 0, 50),
('L12', 18, 7, 0, 50);

-- Insert data into the Work_Section table
INSERT INTO Work_Section (Section_Id, Work_Section, Branch_Id, Department_Mail) VALUES
('S001', 'HR', 'B001', 'hr.srilanka@jupiter.com'),
('S002', 'Finance', 'B002', 'finance.bangladesh@jupiter.com'),
('S003', 'IT', 'B003', 'it.pakistan@jupiter.com'),
('S004', 'Operations', 'B004', 'operations.india@jupiter.com'),
('S005', 'Sales', 'B005', 'sales.uk@jupiter.com'),
('S006', 'Marketing', 'B006', 'marketing.australia@jupiter.com');

-- Insert data into the Professional_Details table
INSERT INTO Professional_Details (Employee_Id, Job_Title, Pay_Grade, Employment_Status, Skills, Basic_Salary, Section_Id, Availability_Status, Company_Work_Mail) VALUES
('E0000001', 'HR Manager', 'L2', 'Permanent', 'Leadership, HR Management', 80000, 'S001', TRUE, 'john.doe@jupiter.com'),
('E0000002', 'Accountant', 'L4', 'Permanent', 'Accounting, Financial Analysis', 70000, 'S002', TRUE, 'jane.smith@jupiter.com'),
('E0000003', 'Software Engineer', 'L2', 'Permanent', 'Java, C++, SQL', 60000, 'S003', TRUE, 'michael.brown@jupiter.com'),
('E0000004', 'QA Engineer', 'L3', 'Fulltime contract', 'Testing, Automation', 55000, 'S004', TRUE, 'emily.jones@jupiter.com'),
('E0000005', 'Sales Executive', 'L2', 'Parttime intern', 'Sales, Communication', 40000, 'S005', TRUE, 'chris.taylor@jupiter.com'),
('E0000006', 'Marketing Manager', 'L5', 'Freelance', 'Marketing, SEO', 85000, 'S006', TRUE, 'sarah.wilson@jupiter.com');

-- Insert data into the Past_Job_Positions table
INSERT INTO Past_Job_Positions (Job_Title, Employee_Id, Time_Period_Years, Rating_Performance) VALUES
('HR Assistant', 'E0000001', 3, 85),
('Junior Accountant', 'E0000002', 2, 90),
('Junior Developer', 'E0000003', 4, 88),
('Intern QA', 'E0000004', 1, 92),
('Sales Rep', 'E0000005', 1, 80),
('Marketing Manager', 'E0000006', 2, 86);

-- Insert data into the Section_Contact_Info table
INSERT INTO Section_Contact_Info (Section_Lan_Number, Section_Id) VALUES
(114678901, 'S001'),
(880345678, 'S002'),
(921456789, 'S003'),
(912567890, 'S004'),
(441678901, 'S005'),
(611789012, 'S006');

-- Insert data into the Emergency_Information table
INSERT INTO Emergency_Information (Dependant_Mobile_Number, Dependant_Name, Dependant_Address, Employee_Id) VALUES
(777987654, 'Lisa Doe', '456 Main St, Colombo', 'E0000001'),
(778876543, 'Robert Smith', '789 Park Ave, Dhaka', 'E0000002'),
(779765432, 'Linda Brown', '101 Hill St, Karachi', 'E0000003'),
(770654321, 'James Jones', '202 Lake Rd, Mumbai', 'E0000004'),
(771543210, 'Mary Taylor', '303 River St, London', 'E0000005'),
(772432109, 'David Wilson', '404 Ocean Dr, Sydney', 'E0000006');

-- Insert data into the Customize_Employee_Attribute table
INSERT INTO Customize_Employee_Attribute (Employee_Id, New_Attribute_Name) VALUES
('E0000001', 'Nationality'),
('E0000002', 'Nationality'),
('E0000003', 'Nationality'),
('E0000004', 'Nationality'),
('E0000005', 'Nationality'),
('E0000006', 'Nationality');

-- Insert data into the Supervisor table
-- TRUNCATE TABLE Leave_Request;
-- TRUNCATE TABLE Supervisor;
INSERT INTO Supervisor (Employee_Id,Supervisor_Id) VALUES
('E0000001','E0000003'),
('E0000002','E0000003'),
('E0000003','E0000004'),
('E0000004','E0000003'),
('E0000005','E0000003'),
('E0000006','E0000003');
-- assume each employee has exactly one supervisor


-- Insert data into the Leave_Request table
CALL InsertLeaveRequest('E0000001', 'Annual', '2024-01-10', 5, TRUE);
CALL InsertLeaveRequest('E0000002', 'Casual', '2024-02-05', 2, FALSE);
CALL InsertLeaveRequest('E0000003', 'Maternity', '2024-03-01', 30, TRUE);
CALL InsertLeaveRequest('E0000004', 'Annual', '2024-04-10', 5, TRUE);
CALL InsertLeaveRequest('E0000005', 'Casual', '2024-05-20', 1, FALSE);
CALL InsertLeaveRequest('E0000006', 'Annual', '2024-06-15', 5, TRUE);

