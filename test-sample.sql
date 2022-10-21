SELECT quote, author FROM quotes 
        ORDER BY RANDOM() 
LIMIT 1

SELECT name FROM user_info WHERE email = admin@admin.com and password = admin

SELECT name FROM user_info WHERE email = notauser@admin.com and password = notuser

SELECT name FROM user_info WHERE email = admin@admin.com

INSERT INTO user_info VALUES
