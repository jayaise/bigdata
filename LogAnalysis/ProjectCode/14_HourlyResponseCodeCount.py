#------ Hourly 404 Response Codes-----
# Filtering bad records
badRecords = (parsed_logs.filter(lambda logs: logs.response_code==404).cache())

# Import required packages
from operator import add

# key: hour, value:1
hourCountPairTuple = badRecords.map(lambda log: (log.date_time.hour,1))

# Each hours, total number of bad records
hourRecordsSum = hourCountPairTuple.reduceByKey(add)

# Sort on hours
hourRecordsSorted = hourRecordsSum.sortByKey()

# Save to HDFS

hourRecordsSorted.saveAsTextFile('sparkProject/14_HourlyResponseCodeCount')

sc.stop()