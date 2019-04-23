#----- Listing 404 Response Codes per Day-----

# Filtering bad records
badRecords = (parsed_logs.filter(lambda logs: logs.response_code==404).cache())

# Import required packages
from operator import add

# Key:day, value:1
errDateCountPairTuple = badRecords.map(lambda badlogs: (badlogs.date_time.day,1))

# Each day, number of 404 response code errors
errDateSum = errDateCountPairTuple.reduceByKey(add)

# Sort on days
errDateSorted = errDateSum.sortByKey().cache()

# Save to HDFS
errDateSorted.saveAsTextFile('sparkProject/13_dayWise404ResponseCodeCount')

#----- Top Five Days for 404 Response Codes------
topErrDate = errDateSorted.takeOrdered(5, lambda s: -1 * s[1])

print("Top 5 days with more response codes:",topErrDate)

sc.stop()