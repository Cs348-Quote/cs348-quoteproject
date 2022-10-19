CREATE TABLE IF NOT EXISTS "user_info" (
	"username" TEXT NOT NULL,
	"email" TEXT NOT NULL PRIMARY KEY,
	"password" TEXT NOT NULL
);

INSERT INTO user_info VALUES
('admin', 'admin@gmail.com', 'admin'),
('test', 'test@gmail.com', 'test')
