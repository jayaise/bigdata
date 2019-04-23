from pyspark.sql import SQLContext

#----------------Spark SQL -------------------------
sqlContext = SQLContext(sc) # Create spark context
parsed_logs_df = sqlContext.createDataFrame(parsed_logs) # Convert it to Data Frame

print("------- Schema ------------")
print(parsed_logs_df.printSchema()) # Check the schema

# Register data frame as a table to start querying
parsed_logs_df.registerTempTable("parsed_logs_df")

# Query Total Number of records
totalCount = sqlContext.sql("select count(*) from parsed_logs_df")
print("------- total number of records ------------")
print(totalCount.collect())

# top ten end points

topTen=sqlContext.sql("select endpoint, count(*) as count1 from parsed_logs_df group by endpoint order by count1 desc limit 10")
print("------- top ten end points ------------")
print(topTen.collect())



# Total content size for each host?
ContentStatsPerHost=sqlContext.sql("select host, count(*) as frequency, sum(content_size) as totalBytes, avg(content_size) as averageSize from parsed_logs_df group by host order by frequency")

ContentStatsPerHost.rdd.saveAsTextFile("sparkProject/16_SparkSQL_ContentStatsPerHost")

#sc.stop()

# QUerying hive from spark
sqlContext = HiveContext(sc)

sqlContext.sql("use default")

results = sqlContext.sql("show tables").show()
print(results)

total_sales = sqlContext.sql("select * from total_sales limit 10").collect()
print(total_sales)
sc.stop()
