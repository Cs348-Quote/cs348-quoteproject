CREATE TABLE IF NOT EXISTS "user_info" (
	"username" TEXT NOT NULL UNIQUE,
	"email" TEXT NOT NULL PRIMARY KEY,
	"password" TEXT NOT NULL,
	constraint fk_user_info_authors
     foreign key (username) 
     REFERENCES authors (name)
);

INSERT INTO user_info VALUES
('admin', 'admin@gmail.com', 'admin'),
('test', 'test@gmail.com', 'test')
