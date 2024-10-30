DROP DATABASE IF EXISTS defaultdb;
CREATE DATABASE defaultdb;
USE defaultdb;

-- Employee table
CREATE TABLE Employee (
    Employee_Id CHAR(8) PRIMARY KEY,
    First_Name VARCHAR(20),
    Last_Name VARCHAR(20),
    Full_Name VARCHAR(50),
    Recruitment_Date DATE,
    Date_Of_Birth DATE,
    Gender ENUM('Male', 'Female', 'Other'),
    Marital_Status BOOLEAN,
    Personal_Email VARCHAR(50),
    Country VARCHAR(20),
    Address VARCHAR(100)
);

-- Branch table
CREATE TABLE Branch (
    Branch_Id CHAR(4) PRIMARY KEY,
    Branch_name VARCHAR(20),
    Country VARCHAR(20),
    Location VARCHAR(50)
);

-- Branch_Contact_Info table
CREATE TABLE Branch_Contact_Info (
    Branch_Lan_Number INT PRIMARY KEY,
    Branch_Id CHAR(4),
    FOREIGN KEY (Branch_Id) REFERENCES Branch(Branch_Id) ON DELETE SET NULL
);

-- User_Account table
CREATE TABLE User_Account (
    User_Id CHAR(8) PRIMARY KEY,
    Employee_Id CHAR(8),
    User_Password VARCHAR(200),
    Profile_Pic BLOB,
    Role VARCHAR(20),
    FOREIGN KEY (Employee_Id) REFERENCES Employee(Employee_Id) ON DELETE SET NULL
);

-- Employee_Contact_Info table
CREATE TABLE Employee_Contact_Info (
    Employee_Mobile_Number INT PRIMARY KEY,
    Employee_Id CHAR(8),
    FOREIGN KEY (Employee_Id) REFERENCES Employee(Employee_Id) ON DELETE SET NULL
);

-- Available_Leaves table
CREATE TABLE Available_Leaves (
    Employee_Id CHAR(8),
    Annual_Leaves INT,
    Casual_Leaves INT,
    Maternity_Leaves INT,
    No_Pay_Leaves INT,
    PRIMARY KEY (Employee_Id),
    FOREIGN KEY (Employee_Id) REFERENCES Employee(Employee_Id) ON DELETE SET NULL
);

-- Maximum_Leave_Count table
CREATE TABLE Maximum_Leave_Count (
    Pay_Grade ENUM('L1','L2','L3','L4','L5','L6','L7','L8','L9','L10','L11','L12') PRIMARY KEY,
    Annual_Leave_Count INT,
    Casual_Leave_Count INT,
    Maternity_Leave_Count INT,
    No_Pay_Leave_Count INT
);

-- Work_Section table
CREATE TABLE Work_Section (
    Section_Id CHAR(4) PRIMARY KEY,
    Work_Section VARCHAR(50),
    Branch_Id CHAR(4),
    Department_Mail VARCHAR(50),
    FOREIGN KEY (Branch_Id) REFERENCES Branch(Branch_Id) ON DELETE SET NULL
);

-- Professional_Details table
CREATE TABLE Professional_Details (
    Employee_Id CHAR(8) PRIMARY KEY,
    Job_Title VARCHAR(20),
    Pay_Grade ENUM('L1','L2','L3','L4','L5','L6','L7','L8','L9','L10','L11','L12'),
    Employment_Status ENUM('Permanent','Fulltime intern','Parttime intern','Fulltime contract','Parttime contract','Freelance'),
    Skills VARCHAR(150),
    Basic_Salary INT,
    Section_Id CHAR(4),
    Availability_Status BOOLEAN,
    Company_Work_Mail VARCHAR(50),
    FOREIGN KEY (Employee_Id) REFERENCES Employee(Employee_Id) ON DELETE SET NULL,
    FOREIGN KEY (Section_Id) REFERENCES Work_Section(Section_Id) ON DELETE SET NULL,
    FOREIGN KEY (Pay_Grade) REFERENCES Maximum_Leave_Count(Pay_Grade)
);

-- Past_Job_Positions table
CREATE TABLE Past_Job_Positions (
    Job_Title VARCHAR(20),
    Employee_Id CHAR(8),
    Time_Period_Years INT,
    Rating_Performance INT,
    PRIMARY KEY (Job_Title, Employee_Id),
    FOREIGN KEY (Employee_Id) REFERENCES Employee(Employee_Id) ON DELETE SET NULL
);

-- Section_Contact_Info table
CREATE TABLE Section_Contact_Info (
    Section_Lan_Number INT PRIMARY KEY,
    Section_Id CHAR(4),
    FOREIGN KEY (Section_Id) REFERENCES Work_Section(Section_Id) ON DELETE SET NULL
);

-- Emergency_Information table
CREATE TABLE Emergency_Information (
    Dependant_Mobile_Number INT,
    Dependant_Name VARCHAR(50),
    Dependant_Address VARCHAR(50),
    Employee_Id CHAR(8),
    PRIMARY KEY (Dependant_Mobile_Number, Employee_Id),
    FOREIGN KEY (Employee_Id) REFERENCES Employee(Employee_Id) ON DELETE SET NULL
);

-- Customize_Employee_Attribute table
CREATE TABLE Customize_Employee_Attribute (
    Employee_Id CHAR(8),
    New_Attribute_Name VARCHAR(20),
    PRIMARY KEY (Employee_Id, New_Attribute_Name),
    FOREIGN KEY (Employee_Id) REFERENCES Employee(Employee_Id) ON DELETE SET NULL
);

-- Supervisor table
CREATE TABLE Supervisor (
    Employee_Id CHAR(8),
    Supervisor_Id CHAR(8),
    PRIMARY KEY (Supervisor_Id, Employee_Id),
    FOREIGN KEY (Supervisor_Id) REFERENCES Employee(Employee_Id) ON DELETE SET NULL,
    FOREIGN KEY (Employee_Id) REFERENCES Employee(Employee_Id) ON DELETE SET NULL
);

-- Leave_Request table
CREATE TABLE Leave_Request (
    Request_Id INT AUTO_INCREMENT PRIMARY KEY,
    Employee_Id CHAR(8),
    Leave_Type VARCHAR(20),
    Start_Date DATE,
    Time_Period_Days INT,
    Supervisor_Id CHAR(8),
    Approval_Status BOOLEAN,
    FOREIGN KEY (Employee_Id) REFERENCES Employee(Employee_Id) ON DELETE SET NULL,
    FOREIGN KEY (Supervisor_Id) REFERENCES Supervisor(Supervisor_Id) ON DELETE SET NULL
);