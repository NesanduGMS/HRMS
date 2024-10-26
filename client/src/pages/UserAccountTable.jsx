import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './UserAccountTable.css';

const UserAccountTable = () => {
  const { employeeId } = useParams();
  const [userAccounts, setUserAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newUserAccount, setNewUserAccount] = useState({
    userId: '',
    employeeId: employeeId,
    password: '',
    role: 'Employee'
  });

  useEffect(() => {
    const fetchUserAccounts = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/employees/user-accounts/${employeeId}`);
        setUserAccounts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user accounts:', error);
        if (error.response && error.response.status === 404) {
          setUserAccounts([]); // No user accounts found
        } else {
          setError('Error fetching user accounts');
        }
        setLoading(false);
      }
    };

    fetchUserAccounts();
  }, [employeeId]);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3005/api/employees/user-accounts/${userId}`);
      setUserAccounts(userAccounts.filter(account => account.User_Id !== userId));
    } catch (error) {
      console.error('Error deleting user account:', error);
      setError('Error deleting user account');
    }
  };

  const handleAdd = async () => {
    if (!newUserAccount.userId || !newUserAccount.employeeId || !newUserAccount.password) return;
    try {
      const response = await axios.post('http://localhost:3005/api/employees/user-accounts', newUserAccount);
      setUserAccounts([...userAccounts, response.data]);
      setNewUserAccount({ userId: '', employeeId: employeeId, password: '', role: 'Employee' });
    } catch (error) {
      console.error('Error adding user account:', error);
      setError('Error adding user account');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="user-account-page">
      <h2>User Accounts for Employee ID: {employeeId}</h2>
      {userAccounts.length === 0 ? (
        <div>
          <p>No user accounts found for this employee.</p>
          <div className="add-user-account">
            <input
              type="text"
              value={newUserAccount.userId}
              onChange={(e) => setNewUserAccount({ ...newUserAccount, userId: e.target.value })}
              placeholder="Enter user ID"
            />
            <input
              type="password"
              value={newUserAccount.password}
              onChange={(e) => setNewUserAccount({ ...newUserAccount, password: e.target.value })}
              placeholder="Enter password"
            />
            <select
              value={newUserAccount.role}
              onChange={(e) => setNewUserAccount({ ...newUserAccount, role: e.target.value })}
            >
              <option value="HR_Manager">HR Manager</option>
              <option value="Manager">Manager</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Employee">Employee</option>
            </select>
            <button onClick={handleAdd}>Add User Account</button>
          </div>
        </div>
      ) : (
        <table className="user-account-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Employee ID</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userAccounts.map((account) => (
              <tr key={account.User_Id}>
                <td>{account.User_Id}</td>
                <td>{account.Employee_Id}</td>
                <td>{account.Role}</td>
                <td>
                  <button onClick={() => handleDelete(account.User_Id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserAccountTable;
