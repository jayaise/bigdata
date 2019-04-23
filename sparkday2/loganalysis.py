
#-----------------------------Response Code analysis -------------------#

responseCodeRDD = parsed_logs.map(lambda log:(log.response_code,1))
responseCountRDD = responseCodeRDD.reduceByKey(lambda a,b:a+b)
print("----------Output of response Code analysis:--------------")
for i in responseCountRDD.collect():
	print(i)

#-----------------------------Day wise Response Code analysis -------------------#
print("-----------------Day wise Response Code analysis -----------")
responseCodeDayRDD = parsed_logs.map(lambda log:(log.date_time.day,log.response_code),1)
dayResponseCountRDD = responseCodeDayRDD.reduceByKey(lambda a,b:a+b)
dayResponseCountRDD1 = dayResponseCountRDD.sortByKey()
print("----------------Output of Day wise Response Code analysis:----------------")
for i in dayResponseCountRDD1.collect():
	print(i)
	
#-----------------------------Day wise number of distinct -------------------#
print("-----------------Day wise number of distinct -----------")
dayUsersRDD = parsed_logs.map(lambda log:(log.date_time.day,log.host))
dayUsersGroupRDD = dayUsersRDD.groupByKey()
dayUsersDisCountRDD = dayUsersGroupRDD.map(lambda(day,users):(day,len(set(users))))

for i in dayUsersDisCountRDD.collect():
	print(i)
	
sc.stop()

#cd ~/sparkday2
#copy 1_initiaLoader.py,loganalysis.py,runner.py file to sparkday2
#hadoop fs -mkdir sparkProject
# hadoop fs -cp /tmp/apache.access.log.... sparkProject
# spark-submit runner.py >output

