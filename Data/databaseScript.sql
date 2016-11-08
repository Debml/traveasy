CREATE TABLE Users (
	fName VARCHAR(30) NOT NULL,
    lName VARCHAR(30) NOT NULL,
    username VARCHAR(50) NOT NULL PRIMARY KEY,
    passwrd VARCHAR(100) NOT NULL,  
    email VARCHAR(30) NOT NULL
);

INSERT INTO Users(fName, lName, username, passwrd, email)
VALUES ('David', 'Benitez', 'debml', 'Ld9gQ587EDCfj2Kk+98RjORYblBbisLP5Vn7+2UhT40=', 'debml700@gmail.com');