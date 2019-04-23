#-------- day wise number of unique hosts ------
from operator import add
# key: day, value: host
dayToHostPairTuple = parsed_logs.map(lambda log: (log.date_time.day, log.host))
# Group on key
dayGroupedHosts = dayToHostPairTuple.groupByKey()
# Foreach group, get distinct users. 
# Sets will remove duplicates, length of the set will give number of unique hosts
dayHostCount = dayGroupedHosts.map(lambda (a,b):(a,len(set(b))))

# Sorting on days
dailyHosts = (dayHostCount.sortByKey())

# Save to HDFS file
dailyHosts.saveAsTextFile("sparkProject/9_DayWiseNumberOfDistinctUsers")
