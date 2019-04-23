#----- Listing the Top Twenty-five 404 Response Code Hosts ------

# Filtering bad records
badRecords = (parsed_logs.filter(lambda logs: logs.response_code==404).cache())

# Import required packages
from operator import add

# key: host, value:1
errHostsCountPairTuple = badRecords.map(lambda badlogs: (badlogs.host,1))

# Each host, bad errors
errHostsSum = errHostsCountPairTuple.reduceByKey(add)

# Top 25 hosts with errors
errHostsTop25 = errHostsSum.takeOrdered(25, lambda s: -1 * s[1])

# Reconvert it to RDD, to save to HDFS. There are multiple ways to store the data, this is one way.
errHostsTop25 = sc.parallelize(errHostsTop25)

# Save to HDFS
errHostsTop25.saveAsTextFile("sparkProject/12_top20HostsWithErrors")

sc.stop()