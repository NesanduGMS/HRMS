import jwt from 'jsonwebtoken';
import db from '../utils/db.js';


import bcrypt from 'bcrypt';

export const login = (req, res) => {
    const sql = "SELECT * FROM User_Account WHERE User_Id = ?";
    db.query(sql, [req.body.userid], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: err.message });

        if (result.length > 0) {
            // Retrieve hashed password from the database
            const hashedPassword = result[0].User_Password;

            // Compare entered password with the hashed password
            bcrypt.compare(req.body.password, hashedPassword, (bcryptErr, isMatch) => {
                if (bcryptErr) return res.json({ loginStatus: false, Error: bcryptErr.message });

                if (isMatch) {
                    const role = result[0].Role;
                    const token = jwt.sign(
                        { Role: role, Userid: result[0].User_Id },
                        'secretkey',
                        { expiresIn: '1d' }
                    );
                    res.cookie('token', token);
                    return res.json({ loginStatus: true, Employeeid: result[0].Employee_Id, ROLE: role });
                } else {
                    return res.json({ loginStatus: false, Error: "Incorrect password" });
                }
            });
        } else {
            return res.json({ loginStatus: false, Error: "User not found" });
        }
    });
};

export const userdetails = (req,res)=>{
    
    const sql = "SELECT * FROM Profileinfo WHERE Employee_Id = ?";
    db.query(sql,[req.params.userId],(err,result)=>{
        if(err)return res.json({Status:false,Error:'query error'});
        if(result.length>0){
            
            return res.json({Status:true,Result:result[0]});
        }
        else{
            return res.json({Error:"No Profile found"});
        }
    })
}


export const maxleave = (req,res)=>{
    const sql = "SELECT * FROM LeaveMax WHERE Employee_Id = ?";
    db.query(sql,[req.params.userId],(err,result)=>{
        if(err)return res.json({Status:false,Error:'query error'});
        if(result.length>0){
            return res.json({Status:true,Result:result[0]});
        }
        else{
            return res.json({Error:"No Data found"});
        }
    })

}




export const avlleave = (req,res)=>{
    const sql = "SELECT * FROM Available_Leaves WHERE Employee_Id = ?";
    db.query(sql,[req.params.userId],(err,result)=>{
        if(err)return res.json({Status:false,Error:'query error'});
        if(result.length>0){
            return res.json({Status:true,Result:result[0]});
        }
        else{
            return res.json({Error:"No Data found"});
        }
    })

}





export const viewinfoa = (req,res)=>{
    const sql = "SELECT * FROM Employee WHERE Employee_Id = ?";
    db.query(sql,[req.params.ID],(err,result)=>{
        if(err)return res.json({Status:false,Error:'query error'});
        if(result.length>0){
            return res.json({Status:true,Result:result[0]});
        }
        else{
            return res.json({Error:"No Data found"});
        }
    })

}

export const viewinfob = (req,res)=>{
    const sql = "SELECT * FROM Emergency_Information WHERE Employee_Id = ?";
    db.query(sql,[req.params.ID],(err,result)=>{
        if(err)return res.json({Status:false,Error:'query error'});
        if(result.length>0){
            return res.json({Status:true,Result:result[0]});
        }
        else{
            return res.json({Error:"No Data found"})
        }
    })
}



export const viewinfoc = (req,res)=>{
    const sql = "SELECT * FROM Employee_Contact_Info WHERE Employee_Id = ?";
    db.query(sql,[req.params.ID],(err,result)=>{
        if(err)return res.json({Status:false,Error:'query error'});
        if(result.length>0){
            return res.json({Status:true,Result:result});
        }
        else{
            return res.json({Error:"No Data found"});
        }
    })
}



export const flogout = (req,res)=>{
    res.clearCookie('token');
    return res.json({Status: true});

}



export const selsup = (req, res) => {
    const sql = "SELECT * FROM Supervisor WHERE Employee_Id = ?";
    db.query(sql, [req.params.EmployeeId], (err, result) => {
      if (err) return res.json({ Status: false, Error: 'Query error' });
      if (result.length > 0) {
        return res.json({ Status: true, Result: result[0] }); // Send the first result (Supervisor data)
      } else {
        return res.json({ Status: false, Error: "No Data found" });
      }
    });
  };


export const addleavereq = (req, res) => {
    const values = [
        req.params.EmployeeId,
        req.body.leaveType,
        req.body.startDate,
        req.body.numDays,
        req.body.supervisorId,
        0, // Assuming 0 is the default approval status
    ];
    
    const sql = "INSERT INTO Leave_Request (`Employee_Id`, `Leave_Type`, `Start_Date`, `Time_Period_Days`, `Supervisor_Id`, `Approval_Status`) VALUES (?)";
    
    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ Status: false, Error: 'Internal server error' });
        }
        res.status(201).json({ Status: true, Message: 'Leave request added successfully' });
    });
}



export const fetchleaves = (req, res) => {
    const sql = "SELECT * FROM Leave_Request WHERE Supervisor_Id = ?";
    db.query(sql,req.params.supID, (err, result) => {
      if (err) return res.json({ Status: false, Error: 'Query error' });
      if (result.length > 0) {
        return res.json({ Status: true, Result: result }); // Send all leave requests
      } else {
        return res.json({ Status: false, Error: "No Data found" });
      }
    });
  };


export const approveleave = (req, res) => {
    // Get a connection from the pool
    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection:', err);
            return res.json({ Status: false, Error: 'Connection failed', Details: err.message });
        }

        // Start transaction
        connection.query('START TRANSACTION', (err) => {
            if (err) {
                console.error('Error starting transaction:', err);
                connection.release();
                return res.json({ Status: false, Error: 'Transaction start failed', Details: err.message });
            }

            // Step 1: Update Approval Status
            const approveSql = "UPDATE Leave_Request SET Approval_Status = 1 WHERE Request_Id = ?";
            connection.query(approveSql, [req.params.id], (err) => {
                if (err) {
                    console.error('Error updating approval status:', err);
                    return connection.query('ROLLBACK', () => {
                        connection.release();
                        res.json({ Status: false, Error: 'Approval update failed', Details: err.message });
                    });
                }

                // Step 2: Get Leave Request details
                const leaveRequestSql = "SELECT Employee_Id, Leave_Type, Time_Period_Days FROM Leave_Request WHERE Request_Id = ?";
                connection.query(leaveRequestSql, [req.params.id], (err, results) => {
                    if (err) {
                        console.error('Error fetching leave request details:', err);
                        return connection.query('ROLLBACK', () => {
                            connection.release();
                            res.json({ Status: false, Error: 'Leave request fetch failed', Details: err.message });
                        });
                    }

                    const leaveRequest = results[0];
                    const { Employee_Id, Leave_Type, Time_Period_Days } = leaveRequest;

                    // Step 3: Update Available Leaves
                    const updateLeavesSql = `
                        UPDATE Available_Leaves 
                        SET ${Leave_Type}_Leaves = ${Leave_Type}_Leaves - ? 
                        WHERE Employee_Id = ?`;
                    connection.query(updateLeavesSql, [Time_Period_Days, Employee_Id], (err) => {
                        if (err) {
                            console.error('Error updating available leaves:', err);
                            return connection.query('ROLLBACK', () => {
                                connection.release();
                                res.json({ Status: false, Error: 'Available leaves update failed', Details: err.message });
                            });
                        }

                        // Commit transaction
                        connection.query('COMMIT', (err) => {
                            connection.release();
                            if (err) {
                                console.error('Error committing transaction:', err);
                                return res.json({ Status: false, Error: 'Transaction commit failed', Details: err.message });
                            }
                            res.json({ Status: true, Message: 'Leave request approved' });
                        });
                    });
                });
            });
        });
    });
};
  

export const getPerformance = (req,res)=>{
    const sql = "SELECT * FROM Past_Job_Positions WHERE Employee_Id = ?";
    db.query(sql,[req.params.UID],(err,result)=>{
        if(err)return res.json({Status:false,Error:'query error'});
        if(result.length>0){
            return res.json({Status:true,Result:result});
        }
        else{
            return res.json({Error:"No Data found"});
        }
    })
}  



export const workinfo = (req,res)=>{
    const sql = "SELECT * FROM Employee_Work_Details WHERE Employee_Id = ?";
    db.query(sql,[req.params.UID],(err,result)=>{
        if(err)return res.json({Status:false,Error:'query error'});
        if(result.length>0){
            return res.json({Status:true,Result:result});
        }
        else{
            return res.json({Error:"No Data found"});
        }
    })
}  



export const coninfo = (req,res)=>{
    const sql = "SELECT * FROM SectionBranchLanView WHERE Employee_Id = 'S001'";
    db.query(sql,(err,result)=>{
        if(err)return res.json({Status:false,Error:'query error'});
        if(result.length>0){
            return res.json({Status:true,Result:result});
        }
        else{
            return res.json({Error:"No Data found"});
        }
    })
}  