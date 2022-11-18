SELECT quote, author FROM quotes 
		ORDER BY RANDOM() 
LIMIT 1

SELECT name FROM user_info WHERE email = admin@admin.com and password = admin

SELECT name FROM user_info WHERE email = notauser@admin.com and password = notuser

SELECT name FROM user_info WHERE email = admin@admin.com

SELECT name FROM user_info WHERE email =notauser@admin.com

INSERT INTO authors (name) VALUES ‘Fred’

SELECT name FROM authors WHERE name = ‘admin’

SELECT username FROM user_info WHERE username = test

INSERT INTO user_info VALUES
	(admin, admin@admin.com, admin)

SELECT MAX(qid) FROM quotes

SELECT username FROM user_info WHERE email = 'admin@gmail.com'

SELECT name FROM authors WHERE name = C. S. Lewis

INSERT INTO quotes (qid, quote, author, category) VALUES (19, 'Saje Natural Wellness', 'admin', 'Romance')

SELECT name, location, coordx, coordy FROM authors WHERE region = ‘Italy’ 
ORDER BY RANDOM() 
LIMIT 10

SELECT quote,author FROM quotes WHERE author IN (‘Vladimir Lenin’, ‘Marcus Tullius Cicero’ )

SELECT quote FROM quotes WHERE author = ‘Marcus Tullius Cicero’

Sample Queries:
	SELECT name, time FROM authors WHERE time <= 948171485 AND time >= -63522643463
ORDER BY RANDOM() 
LIMIT 2


