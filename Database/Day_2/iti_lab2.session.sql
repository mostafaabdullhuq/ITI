UPDATE Employee
SET
    Salary = (0.2 * Salary + Salary)
WHERE (
        Fname = 'Mostafa'
        AND Lname = 'Abdullhuq'
    );