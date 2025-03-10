
import db from '../utils/db.js';
import util from 'util';

const query = util.promisify(db.query).bind(db);

export const addEmployeeDetails = async (req, res) => {
  const {
    employee: {
      First_Name, Last_Name, Full_Name, Recruitment_Date,
      Date_Of_Birth, Gender, Marital_Status, Personal_Email, Country, Address
    },
    contactInfo: { Employee_Mobile_Number },
    availableLeaves: { Annual_Leaves, Casual_Leaves, Maternity_Leaves, No_Pay_Leaves },
    professionalDetails: { Job_Title, Pay_Grade, Employment_Status, Skills, Basic_Salary, Section_Id, Availability_Status, Company_Work_Mail },
    pastJobPosition: { Job_Title: Past_Job_Title, Time_Period_Years, Rating_Performance },
    emergencyInfo: { Dependant_Mobile_Number, Dependant_Name, Dependant_Address },
    supervisorDetails: { Supervisor_Id }
  } = req.body;

  // Format dates to remove the time part
  const formattedRecruitmentDate = new Date(Recruitment_Date).toISOString().split('T')[0];
  const formattedDateOfBirth = new Date(Date_Of_Birth).toISOString().split('T')[0];

  try {
    // Start transaction
    await query('START TRANSACTION');

    // Insert into Employee table
    await query(`
      INSERT INTO Employee (First_Name, Last_Name, Full_Name, Recruitment_Date, Date_Of_Birth, Gender, Marital_Status, Personal_Email, Country, Address) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [First_Name, Last_Name, Full_Name, formattedRecruitmentDate, formattedDateOfBirth, Gender, Marital_Status, Personal_Email, Country, Address]
    );
    console.log("Inserted into Employee table");

    // Retrieve the new Employee_Id
    const Employee_Id_Result = await query(`SELECT MAX(Employee_Id) AS Employee_Id FROM Employee`);
    const Employee_Id = Employee_Id_Result[0].Employee_Id;
    console.log(`New Employee_Id: ${Employee_Id}`);

    // Insert into Employee_Contact_Info table
    await query(`
      INSERT INTO Employee_Contact_Info (Employee_Id, Employee_Mobile_Number) 
      VALUES (?, ?)`,
      [Employee_Id, Employee_Mobile_Number]
    );
    console.log("Inserted into Employee_Contact_Info table");

    // Insert into Available_Leaves table
    await query(`
      INSERT INTO Available_Leaves (Employee_Id, Annual_Leaves, Casual_Leaves, Maternity_Leaves, No_Pay_Leaves) 
      VALUES (?, ?, ?, ?, ?)`,
      [Employee_Id, Annual_Leaves, Casual_Leaves, Maternity_Leaves, No_Pay_Leaves]
    );
    console.log("Inserted into Available_Leaves table");

    // Insert into Professional_Details table
    await query(`
      INSERT INTO Professional_Details (Employee_Id, Job_Title, Pay_Grade, Employment_Status, Skills, Basic_Salary, Section_Id, Availability_Status, Company_Work_Mail) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [Employee_Id, Job_Title, Pay_Grade, Employment_Status, Skills, Basic_Salary, Section_Id, Availability_Status, Company_Work_Mail]
    );
    console.log("Inserted into Professional_Details table");

    // Insert into Past_Job_Positions table
    await query(`
      INSERT INTO Past_Job_Positions (Employee_Id, Job_Title, Time_Period_Years, Rating_Performance) 
      VALUES (?, ?, ?, ?)`,
      [Employee_Id, Past_Job_Title, Time_Period_Years, Rating_Performance]
    );
    console.log("Inserted into Past_Job_Positions table");

    // Insert into Emergency_Information table
    await query(`
      INSERT INTO Emergency_Information (Employee_Id, Dependant_Mobile_Number, Dependant_Name, Dependant_Address) 
      VALUES (?, ?, ?, ?)`,
      [Employee_Id, Dependant_Mobile_Number, Dependant_Name, Dependant_Address]
    );
    console.log("Inserted into Emergency_Information table");

    // Insert into Supervisor table
    await query(`
      INSERT INTO Supervisor (Employee_Id, Supervisor_Id) 
      VALUES (?, ?)`,
      [Employee_Id, Supervisor_Id]
    );
    console.log("Inserted into Supervisor table");

    // Commit transaction
    await query('COMMIT');
    res.status(201).json({
      message: 'Employee details added successfully!',
      Employee_Id: Employee_Id
    });

  } catch (error) {
    // Rollback transaction if any query fails
    await query('ROLLBACK');
    console.error('Error adding employee details:', error);
    res.status(500).json({
      message: 'Error adding employee details',
      error: error.sqlMessage || error.message
    });
  }
};
