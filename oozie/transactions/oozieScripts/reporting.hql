-- Open hive ediotr in hue, and create database jaya_oozie
-- replace jan _oozie_instructor with jaya_oozie
-- replace instr_sai with your name
-- copy this file to hdfs ooziescripts dir
-- follow the instructions

DROP TABLE IF EXISTS jaya_oozie.transactions_staging;

CREATE EXTERNAL TABLE IF NOT EXISTS jaya_oozie.transactions_staging
( id string,
chain   string,
dept string,
category string,
company string,
brand string,
date1 string,
productsize int,
productmeasure string,
purchasequantity int,
purchaseamount double)
ROW FORMAT DELIMITED FIELDS TERMINATED BY ','
STORED AS TEXTFILE
LOCATION '/user/jayaise/TransactionsData/';
;

DROP TABLE IF EXISTS jaya_oozie.transactions_production;

SET hive.enforce.bucketing = true;
SET hive.exec.dynamic.partition = true;
SET hive.exec.dynamic.partition.mode = nonstrict;

-- production table
CREATE TABLE IF NOT EXISTS jaya_oozie.transactions_production
( id string,
dept string,
category string,
company string,
brand string,
date1 string,
productsize int,
productmeasure string,
purchasequantity int,
purchaseamount double)
PARTITIONED BY (chain   string) CLUSTERED BY(id) INTO 5 BUCKETS
ROW FORMAT DELIMITED FIELDS TERMINATED BY ','
STORED AS TEXTFILE;

INSERT OVERWRITE TABLE jaya_oozie.transactions_production PARTITION (chain) 
select id,dept, category, company,brand,date1,productsize,productmeasure,
purchasequantity,purchaseamount,chain from jaya_oozie.transactions_staging;

DROP TABLE IF EXISTS jaya_oozie.chain_stats;

create table jaya_oozie.chain_stats
AS
select chain, 
count(distinct dept) as deptCIn, 
count(distinct category) as categoryCIn, 
count(distinct company) as companyCIn, 
count(distinct brand) as brandCIn,
SUM(purchaseamount) as totalSpent
from jaya_oozie.transactions_production 
group by chain;
