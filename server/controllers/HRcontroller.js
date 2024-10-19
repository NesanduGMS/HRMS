import jwt from 'jsonwebtoken';
import db from '../utils/db.js';


export const login = (req,res)=>{
    const sql = "SELECT * FROM User_Account WHERE User_Id = ? and User_Password = ?";
    db.query(sql,[req.body.userid,req.body.password],(err,result)=>{
        if(err)return res.json({loginStatus:false,Error:err.message})
        if(result.length>0){
            const role = result[0].Role;
            const token = jwt.sign({Role:role,Userid:result[0].User_Id},'sercretkey',{expiresIn:'1d'});
            res.cookie('token',token)
            return res.json({loginStatus:true,Employeeid:result[0].Employee_Id,Role:role});
        }
        else{
            return res.json({loginStatus:false,Error:"wrong email or password"});
        }

    })


}