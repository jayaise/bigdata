 #       host          = match.group(1),
 #       client_identd = match.group(2),
 #       user_id       = match.group(3),
 #       date_time     = parse_apache_time(match.group(4)),
 #       method        = match.group(5),
 #       endpoint      = match.group(6),
 #       protocol      = match.group(7),
 #       response_code = int(match.group(8)),
 #      content_size  = size
# parsed_logs

 # response code analysis 
 # response code analysis, day wise
 # day wise distinct host count
 # day wise content_size stats
 # host wise content_size stats
 # top 20 end points per day
 
 # response code analysis
responseCodeRDD = parsed_logs.map(lambda logs: (logs.response_code,1))
responseCodeCountRDD = responseCodeRDD.reduceByKey(lambda a,b:a+b)
responseCodeCountResult = responseCodeCountRDD.collect()
print "response code count"
print responseCodeCountResult
print ""

 # response code analysis, day wise
responseCodeDayRDD = parsed_logs.map(lambda logs: ((logs.date_time.day,logs.response_code),1))
responseCodeDayCountRDD = responseCodeDayRDD.reduceByKey(lambda a,b:a+b)
responseCodeDayCountSortedRDD = responseCodeDayCountRDD.sortByKey()
responseCodeDayCountMappedRDD = responseCodeDayCountSortedRDD.map(lambda (k,v): str(k[0])+","+str(k[1])+","+str(v))
responseCodeDayCountMappedRDD.saveAsTextFile("SparkLogAnalysis/responseCodeDayCount")

# ((1,200),400) 1,200,400

 # day wise distinct host count
dayHostRDD = parsed_logs.map(lambda logs: (logs.date_time.day, logs.host))
dayHostGroupedRDD = dayHostRDD.groupByKey()
dayHostGroupedCountRDD = dayHostGroupedRDD.map(lambda (k,v):(k,len(set(v)))).map(lambda (k,v): str(k)+","+str(v))
dayHostGroupedCountRDD.saveAsTextFile("SparkLogAnalysis/dayHostGroupedCountRDD")

sc.stop()