USE defaultdb;

DELIMITER $$

-- TRIGGERS TO GENERATE NEXT ID NUMBERS --
CREATE TRIGGER before_insert_employee
BEFORE INSERT ON Employee
FOR EACH ROW
BEGIN
    DECLARE max_id CHAR(8);
    DECLARE next_id CHAR(8);
    
    -- Get the current maximum Employee_Id
    SELECT MAX(Employee_Id) INTO max_id FROM Employee;

    -- Check if max_id is NULL (when the table is empty)
    IF max_id IS NULL THEN
        SET next_id = 'E0000001';  -- Start with the first ID
    ELSE
        -- Increment the numeric part of the Employee_Id
        SET next_id = CONCAT('E', LPAD(SUBSTRING(max_id, 2) + 1, 7, '0'));
    END IF;
    
    -- Assign the new Employee_Id
    SET NEW.Employee_Id = next_id;
END $$


--  --------------

CREATE TRIGGER before_insert_branch
BEFORE INSERT ON Branch
FOR EACH ROW
BEGIN
    DECLARE max_id CHAR(4);
    DECLARE next_id CHAR(4);

    -- Get the current maximum Branch_Id
    SELECT MAX(Branch_Id) INTO max_id FROM Branch;

    -- Increment the numeric part of the Branch_Id
    IF max_id IS NOT NULL THEN
        SET next_id = CONCAT('B', LPAD(SUBSTRING(max_id, 2) + 1, 3, '0'));
    ELSE
        SET next_id = 'B001';  -- First ID if table is empty
    END IF;

    -- Assign the new Branch_Id
    SET NEW.Branch_Id = next_id;
END $$
-- --------------------------

CREATE TRIGGER before_insert_section
BEFORE INSERT ON Work_Section
FOR EACH ROW
BEGIN
    DECLARE max_id CHAR(4);
    DECLARE next_id CHAR(4);

    -- Get the current maximum Section_Id
    SELECT MAX(Section_Id) INTO max_id FROM Work_Section;

    -- Increment the numeric part of the Section_Id
    IF max_id IS NOT NULL THEN
        SET next_id = CONCAT('S', LPAD(SUBSTRING(max_id, 2) + 1, 3, '0'));
    ELSE
        SET next_id = 'S001';  -- First ID if table is empty
    END IF;

    -- Assign the new Section_Id
    SET NEW.Section_Id = next_id;
END $$
-- ------------------