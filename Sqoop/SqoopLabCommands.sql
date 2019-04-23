5ef05g5nygGJ6gM
mysql -h 52.34.11.96 -u jayaise -p --local-infile

-- 1. list databases
sqoop list-databases --connect jdbc:mysql://52.34.11.96  --username jayaise -P 

-- 2. list tables

sqoop list-tables --connect jdbc:mysql://52.34.11.96/jayaise  --username jayaise -P 

-- 3. eval

sqoop eval --connect jdbc:mysql://52.34.11.96/jayaise --query "select * from orderdetails limit 10" --username jayaise -P 

-- 4. import all tables
sqoop import-all-tables --connect jdbc:mysql://52.34.11.96/jayaise  --username jayaise -P  --warehouse-dir mysqlDatabase

login to hue, and check mysqlDatabase folder in user default directory
And also check job browser on Hue

-- 5. import a specific table

sqoop import --connect jdbc:mysql://52.34.11.96/jayaise  --username jayaise -P --table customers --target-dir customers

login to hue, and check customers folder in user default directory

-- 6. Import with a specific format

RCFileFormat (Hive)
Sequence file format (Map Reduce)
Avro format (Sqoop, Hive, Pig)
Parquet format (Spark)

sqoop import --connect jdbc:mysql://52.34.11.96/jayaise  --username jayaise -P --table customers --target-dir customers_avro --as-avrodatafile

ls *.avsc

cat customers.avsc

-- 7. Import with where condition

sqoop import --connect jdbc:mysql://52.34.11.96/jayaise  --username jayaise -P --table customers --target-dir customers_usa --where "country='USA'"

-- 8. Free Form Queries

sqoop import \
--connect jdbc:mysql://54.149.41.179/pankaj  \
--username pankaj -P \
--query "select t1.orderNumber, t1.status, t2.productCode, t2.quantityOrdered,t1.customerNumber from orders t1 left join orderdetails t2 using (orderNumber) \
Where \$CONDITIONS" \
--split-by orderNumber \
--target-dir joinTables 

sqoop import \
--connect jdbc:mysql://52.34.11.96/jayaise  \
--username jayaise -P \
--query "select t1.orderNumber, t1.status, t2.productCode, t2.quantityOrdered,t1.customerNumber from orders t1 left join orderdetails t2 using (orderNumber) \
Where \$CONDITIONS" \
--split-by orderNumber \
--target-dir joinTables 


-- 9 Export assignment
create a new table in mysql
export data from HDFS to RDBMS


Write a command to export customers data from HDFS back to mysql.

Step1: create a new table in MySQL
Step2: Sqoop export command, check the material
step3: Check hue job browser
step4: up on completion, select * from new table.




saikumar469@yahoo.in




































