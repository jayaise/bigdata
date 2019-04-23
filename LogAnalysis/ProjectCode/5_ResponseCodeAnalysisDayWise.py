#-------- Response Code Analysis Day Wise -----

# Key: day, responsecode, value:1
# reduceByKey to get day wise response code count
# sortByKey to sort on day and response code
responseCodeToCountDayWise = (parsed_logs
                       .map(lambda log: ((log.date_time.day,log.response_code), 1)) 
                       .reduceByKey(lambda a, b : a + b)
					   .sortByKey())

# Save the output to HDFS
responseCodeToCountDayWise.saveAsTextFile("sparkProject/5_ResponseCodeAnalysisDayWise")

sc.stop()