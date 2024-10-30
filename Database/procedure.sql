-- Existing Procedures

DELIMITER //

CREATE PROCEDURE getEmployeeByDepartment(IN department VARCHAR(20))
BEGIN
	SELECT Employee_Id, Full_Name, Gender, Country FROM getEmployee
    WHERE Work_Section = department;
END //

DELIMITER //

/****************************************************************************************************************/

DELIMITER //

CREATE PROCEDURE GetEmployees(
    IN department VARCHAR(50),
    IN payGrade ENUM('L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9', 'L10', 'L11', 'L12'),
    IN jobTitle VARCHAR(20)
)
BEGIN
    -- Initialize the base query
    SET @sql = 'SELECT * FROM getEmployee WHERE 1=1';

    -- Initialize variables for dynamic parameter binding
    SET @param1 = NULL;
    SET @param2 = NULL;
    SET @param3 = NULL;
    SET @paramIndex = 1;

    -- Add conditions to the SQL query and bind parameters
    IF department IS NOT NULL AND department != '' THEN
        SET @sql = CONCAT(@sql, ' AND Work_Section = ?');
        SET @param1 = department;
        SET @paramIndex = @paramIndex + 1;
    END IF;

    IF payGrade IS NOT NULL AND payGrade != '' THEN
        SET @sql = CONCAT(@sql, ' AND Pay_Grade = ?');
        IF @paramIndex = 1 THEN
            SET @param1 = payGrade;
        ELSEIF @paramIndex = 2 THEN
            SET @param2 = payGrade;
        END IF;
        SET @paramIndex = @paramIndex + 1;
    END IF;

    IF jobTitle IS NOT NULL AND jobTitle != '' THEN
        SET @sql = CONCAT(@sql, ' AND Job_Title = ?');
        IF @paramIndex = 1 THEN
            SET @param1 = jobTitle;
        ELSEIF @paramIndex = 2 THEN
            SET @param2 = jobTitle;
        ELSEIF @paramIndex = 3 THEN
            SET @param3 = jobTitle;
        END IF;
    END IF;

    -- Prepare and execute the statement based on available parameters
    PREPARE stmt FROM @sql;
    IF @param1 IS NOT NULL AND @param2 IS NOT NULL AND @param3 IS NOT NULL THEN
        EXECUTE stmt USING @param1, @param2, @param3;
    ELSEIF @param1 IS NOT NULL AND @param2 IS NOT NULL THEN
        EXECUTE stmt USING @param1, @param2;
    ELSEIF @param1 IS NOT NULL THEN
        EXECUTE stmt USING @param1;
    ELSE
        EXECUTE stmt;
    END IF;

    -- Clean up
    DEALLOCATE PREPARE stmt;
END //

DELIMITER //

/****************************************************************************************************************/

DELIMITER //

CREATE PROCEDURE getTotalLeaves(IN department VARCHAR(20), IN start_time DATE, IN end_time DATE)
BEGIN
SELECT lr.Leave_Type, 
       SUM(
           CASE 
               WHEN lr.Start_Date + INTERVAL lr.Time_Period_Days DAY > end_time 
               THEN DATEDIFF(end_time, lr.Start_Date) + 1
               ELSE Time_Period_Days
           END
       ) AS Total_Leave_Days
FROM getEmployee ge
JOIN Leave_Request lr USING(employee_id)
WHERE ge.Work_Section = department AND lr.Approval_Status = '1' AND lr.Start_Date BETWEEN start_time AND end_time
GROUP BY Leave_Type;
END //

DELIMITER //

/****************************************************************************************************************/

-- New Procedures for Dashboard Stats

DELIMITER //

-- Procedure to get total employees
CREATE PROCEDURE getTotalEmployees()
BEGIN
    SELECT COUNT(*) AS totalEmployees FROM getEmployee;
END //

DELIMITER //

DELIMITER //

-- Procedure to get total leaves taken
CREATE PROCEDURE getLeavesTaken()
BEGIN
    SELECT COUNT(*) AS leavesTaken FROM Leave_Request WHERE Approval_Status = '1';
END //

DELIMITER //

DELIMITER //

-- Procedure to get pending leave appeals
CREATE PROCEDURE getPendingLeaveAppeals()
BEGIN
    SELECT COUNT(*) AS pendingLeaveAppeals FROM Leave_Request WHERE Approval_Status = 'pending';
END //

DELIMITER //

DELIMITER //

-- Procedure to get average performance score
CREATE PROCEDURE getAveragePerformance()
BEGIN
    SELECT AVG(performance_score) AS averagePerformance FROM performance_reviews;
END //

DELIMITER ;

