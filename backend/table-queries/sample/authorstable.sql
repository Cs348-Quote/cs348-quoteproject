CREATE TABLE IF NOT EXISTS "authors" (
"name" TEXT NOT NULL PRIMARY KEY,
"location" TEXT,
"jobs" TEXT[],
"coordx" FLOAT,
"coordy" FLOAT
-- constraint fk_authors_locations
--     foreign key (location) 
--     REFERENCES locations (name)
);

INSERT INTO authors VALUES
('Marcus Tullius Cicero','Rome','{"writer","lawyer","poet","politician","jurist","Ancient Roman priest","philosopher","orator","political theorist","Ancient Roman politician","Ancient Roman military personnel","Ancient Roman politician","Ancient Roman military personnel"}','12.482777777' , '41.893055555'),
('C. S. Lewis','Belfast','{"writer","theologian","university teacher"}','-5.93' , '54.596388888'),
('C.S. Lewis','Belfast','{"writer","theologian","university teacher"}','-5.93' , '54.596388888'),
('Albert Camus','Dréan','{"screenwriter","writer","poet","professor","playwright","association football player","journalist","philosopher","novelist","essayist","French Resistance fighter"}','7.75' , '36.68333'),
('Eleanor Roosevelt','Manhattan','{"photographer","historian","memoirist","philanthropist","writer","politician","diplomat","human rights activist","journalist","peace activist","autobiographer","women''s rights activist"}','-73.994166666' , '40.728333333'),
('Mark Twain','Florida','{"writer","teacher","author","journalist","travel writer","aphorist","children''s writer","opinion journalist","novelist","prosaist","humorist","autobiographer","science fiction writer"}','-91.79025' , '39.491694444'),
('Elbert Hubbard','Bloomington','{"writer","journalist","publisher","philosopher"}','-88.993611111' , '40.484166666'),
('Oscar Wilde','Dublin','{"writer","poet","playwright","author","journalist","fabulist","children''s writer","opinion journalist","novelist","essayist","prosaist","short story writer"}','-6.260277777' , '53.349722222'),
('Ben Carson','Detroit','{"writer","politician","psychologist","author","surgeon","university teacher","neurosurgeon"}','-83.0475' , '42.331666666'),
('Alan Bennett','Glasgow','{"screenwriter","actor","writer","playwright","comedian","stage actor","film director","diarist","association football player","association football player","association football manager","association football player"}','-4.25' , '55.861111111'),
('Edward Hopper','Manhattan','{"engraver","illustrator","painter","graphic artist","drawer","pastor"}','-73.994166666' , '40.728333333'),
('Kristin Hersh','Newport','{"composer","singer","singer-songwriter","musician","guitarist","recording artist"}','-71.312622' , '41.488002'),
('Laurel Clark','Ames','{"astronaut","physician","military officer","submariner"}','-93.631586' , '42.027335'),
('admin',null,null,null ,null),
('test',null,null,null ,null)