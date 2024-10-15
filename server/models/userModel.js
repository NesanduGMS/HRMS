const db = require('../config/db'); // Import database configuration

// Function to find a user by User_Id
// Function to find a user by User_Id
const findUserByUserId = async (User_Id) => {
    const query = 'SELECT * FROM Authenticate_data WHERE User_Id = ?'; // SQL query to find user
    try {
        const result = await db.execute(query, [User_Id]); // Execute the query
        
        console.log("Database Result: ", result); // Log the result of the query

        if (result.length === 0) {
            console.log("No user found with User_Id: ", User_Id);
            return null; // Return null if no users are found
        }

        const rows = result[0]; // Get the first element from the result array
        return rows.length > 0 ? rows[0] : null; // Return user if found, otherwise null
    } catch (error) {
        console.error("Database Query Error: ", error); // Log any errors
        throw error; // Rethrow error to be handled elsewhere
    }
};


// Create a new user
const createUser = async (User_Id, User_Password) => {
    const query = 'INSERT INTO User_Account (User_Id, User_Password) VALUES (?, ?)'; // SQL query to insert user
    try {
        const [result] = await db.execute(query, [User_Id, User_Password]); // Execute the query
        return { id: result.insertId }; // Return the created user's ID
    } catch (error) {
        console.error("Database Query Error: ", error); // Log any errors
        throw error; // Rethrow error to be handled elsewhere
    }
};

// Export the functions
module.exports = {
    findUserByUserId, // Export the findUserByUserId function
    createUser // Export the createUser function
    // Add other exports if needed
};
