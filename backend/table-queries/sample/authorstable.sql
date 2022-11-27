CREATE TABLE IF NOT EXISTS "authors" (
"aid" INTEGER PRIMARY KEY,
"name" TEXT NOT NULL UNIQUE,
"location" TEXT,
"country" TEXT,
"jobs" TEXT[],
"image" TEXT,
"description" TEXT,
"coordx" FLOAT,
"coordy" FLOAT
-- constraint fk_authors_locations
--     foreign key (location) 
--     REFERENCES locations (name)
);

INSERT INTO authors VALUES
(1,'Marcus Tullius Cicero','Arpino','Italy','{"writer","lawyer","poet","politician","jurist","Ancient Roman priest","philosopher","orator","political theorist","Ancient Roman politician","Ancient Roman military personnel","Ancient Roman politician","Ancient Roman military personnel"}',NULL,'grandfather of the orator Cicero','13.61155' , '41.64705'),
(2,'C. S. Lewis','Belfast','United Kingdom','{"writer","theologian","university teacher"}','http://commons.wikimedia.org/wiki/Special:FilePath/CS%20Lewis%20%281917%29.jpg','British writer, lay theologian and scholar (1898–1963)','-5.93' , '54.596388888'),
(3,'C.S. Lewis','Belfast','United Kingdom','{"writer","theologian","university teacher"}','http://commons.wikimedia.org/wiki/Special:FilePath/CS%20Lewis%20%281917%29.jpg','British writer, lay theologian and scholar (1898–1963)','-5.93' , '54.596388888'),
(4,'Albert Camus','Dréan','Algeria','{"screenwriter","writer","poet","playwright","association football player","journalist","philosopher","novelist","essayist","French Resistance fighter"}','http://commons.wikimedia.org/wiki/Special:FilePath/Albert%20Camus%2C%20gagnant%20de%20prix%20Nobel%2C%20portrait%20en%20buste%2C%20pos%C3%A9%20au%20bureau%2C%20faisant%20face%20%C3%A0%20gauche%2C%20cigarette%20de%20tabagisme.jpg','French philosopher, author, and journalist','7.75' , '36.68333'),
(5,'Eleanor Roosevelt','New York City','United States of America','{"writer","politician","diplomat","human rights activist","journalist","peace activist","autobiographer","women''s rights activist","photographer","historian","memoirist","philanthropist"}','http://commons.wikimedia.org/wiki/Special:FilePath/ROOSEVELT%2C%20THEODORE%2C%20JR.%2C%20MRS.%20LCCN2016861196%20%28cropped%29.jpg','American philanthropist','-74.0' , '40.7'),
(6,'Mark Twain','Florida','United States of America','{"writer","teacher","author","journalist","travel writer","aphorist","children''s writer","opinion journalist","novelist","prosaist","humorist","autobiographer","science fiction writer"}','http://commons.wikimedia.org/wiki/Special:FilePath/MarkTwain.LOC.jpg','American author and humorist','-91.79025' , '39.491694444'),
(7,'Elbert Hubbard','Bloomington','United States of America','{"writer","journalist","publisher","philosopher"}','http://commons.wikimedia.org/wiki/Special:FilePath/Elbert%20Hubbard.jpg','American writer, publisher, artist, and philosopher','-88.993611111' , '40.484166666'),
(8,'Oscar Wilde','Dublin','Republic of Ireland','{"writer","poet","playwright","author","journalist","fabulist","children''s writer","opinion journalist","novelist","essayist","prosaist","short story writer"}','http://commons.wikimedia.org/wiki/Special:FilePath/Oscar%20Wilde%20portrait%20by%20Napoleon%20Sarony%20-%20albumen.jpg','Irish poet, playwright, and aesthete (1854–1900)','-6.260277777' , '53.349722222'),
(9,'Ben Carson','Detroit','United States of America','{"writer","politician","psychologist","author","surgeon","university teacher","neurosurgeon"}','http://commons.wikimedia.org/wiki/Special:FilePath/Ben%20Carson%20by%20Skidmore%20with%20lighting%20correction.jpg','17th United States Secretary of Housing and Urban Development; American neurosurgeon','-83.0475' , '42.331666666'),
(10,'Alan Bennett','Glasgow','United Kingdom','{"screenwriter","actor","writer","playwright","comedian","stage actor","film director","diarist","association football player","association football player","association football manager","association football player"}',NULL,'association football player','-4.25' , '55.861111111'),
(11,'Edward Hopper','Manhattan','United States of America','{"engraver","illustrator","painter","graphic artist","drawer","pastor"}',NULL,'pastor','-73.994166666' , '40.728333333'),
(12,'Kristin Hersh','Newport','United States of America','{"composer","singer","singer-songwriter","musician","guitarist","recording artist"}','http://commons.wikimedia.org/wiki/Special:FilePath/KristinHershmikebaehrbw2b.jpg','American musician','-71.312622' , '41.488002'),
(13,'Laurel Clark','Ames','United States of America','{"astronaut","physician","military officer","submariner"}','http://commons.wikimedia.org/wiki/Special:FilePath/Laurel%20Clark%2C%20NASA%20photo%20portrait%20in%20blue%20suit.jpg','NASA astronaut, medical doctor, United States Navy Captain, and Space Shuttle mission specialist (1961-2003)','-93.631586' , '42.027335'),
(14,'admin',null,null,null ,null,null,null,null),
(0,'test',null,null,null ,null,null,null,null)