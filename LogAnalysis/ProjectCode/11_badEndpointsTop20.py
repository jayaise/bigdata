#----- Listing the Top Twenty 404 Response Code Endpoints ------

# Filtering bad records
badRecords = (parsed_logs.filter(lambda logs: logs.response_code==404).cache())

# Import required packages
from operator import add

# Key: endpoint, value:1
badEndpointsCountPairTuple = badRecords.map(lambda badlogs: (badlogs.endpoint,1))

# Each endpoint, total number of bad end points
badEndpointsSum = badEndpointsCountPairTuple.reduceByKey(add)

# Pick the top20 bad end points
badEndpointsTop20 = badEndpointsSum.takeOrdered(20, lambda s: -1 * s[1])

# Reconvert it to RDD, to save to HDFS. There are multiple ways to store the data, this is one way.
badEndpointsTop20 = sc.parallelize(badEndpointsTop20)

# Save to HDFS
badEndpointsTop20.saveAsTextFile("sparkProject/11_badEndpointsTop20")

sc.stop()