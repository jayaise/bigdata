create EXTERNAL table twitter_instructor_sai
(followers_count int,
friends_count int,
statuses_count int,
id_str STRING,
screen_name STRING)
ROW FORMAT DELIMITED FIELDS TERMINATED BY ','
STORED AS TEXTFILE
LOCATION '/user/instr_saikumar/twitter/17-05-14';

select count(*) from twitter_instructor_sai;

select * from twitter_instructor_sai limit 10;