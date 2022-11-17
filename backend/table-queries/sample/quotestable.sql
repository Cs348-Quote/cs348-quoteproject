CREATE TABLE IF NOT EXISTS "quotes" (
"qid" int NOT NULL PRIMARY KEY,
"quote" TEXT NOT NULL,
"author" TEXT NOT NULL,
"tags" TEXT[],
"popularity" FLOAT,
"category" TEXT,
 constraint fk_quotes_authors
     foreign key (author) 
     REFERENCES authors (name)
);

INSERT INTO quotes VALUES
(7,'A room without books is like a body without a soul.','Marcus Tullius Cicero','{"books","simile","soul "}',0.09537509537509538,'soul'),
(12,'Friendship ... is born at the moment when one man says to another "What! You too? I thought that no one but myself . . .','C.S. Lewis','{"friendship "}',0.07332207332207333,''),
(14,'Don’t walk in front of me… I may not followDon’t walk behind me… I may not leadWalk beside me… just be my friend','Albert Camus','{"friends","friendship","misattributed-albert-camus "}',0.07155007155007155,''),
(15,'No one can make you feel inferior without your consent.','Eleanor Roosevelt','{"confidence","inspirational","wisdom "}',0.06906506906506907,'inspiration'),
(16,'If you tell the truth, you don''t have to remember anything.','Mark Twain','{"lies","lying","memory","truth "}',0.06795206795206796,'truth'),
(17,'A friend is someone who knows all about you and still loves you.','Elbert Hubbard','{"friend","friendship","knowledge","love "}',0.0661000661000661,'love'),
(18,'Always forgive your enemies; nothing annoys them so much.','Oscar Wilde','{"enemies","forgiveness","strategy "}',0.061497061497061495,'')