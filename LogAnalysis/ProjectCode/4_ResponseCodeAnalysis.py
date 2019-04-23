#-------- Response Code Analysis -----

responseCodeToCount = (parsed_logs
                       .map(lambda log: (log.response_code, 1)) # Key: response code, value: 1
                       .reduceByKey(lambda a, b : a + b))       # Reduce to get each response code, frequency
responseCodeToCountList = responseCodeToCount.collect()         # Collect to get results out of RDD
print 'Found %d response codes' % len(responseCodeToCountList)  # Total number of response codes
print 'Response Code Counts: %s' % responseCodeToCountList      # Print the results

sc.stop()