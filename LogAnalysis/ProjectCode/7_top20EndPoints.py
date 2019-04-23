#-------- Top 20 End Points -------------
endpointCounts = (parsed_logs
                  .map(lambda log: (log.endpoint, 1))   # Key: Endpoint, value:1
                  .reduceByKey(lambda a, b : a + b)     # reduce to get, each endpoint
				  .map(lambda (k,v):(v,k))				# Flip key value pairs
				  .sortByKey(False)						# Sort
				  .map(lambda (k,v):(v,k))				# Again flip
				  .zipWithIndex()						# Add index to choose 20
				  .filter(lambda ((k),v): v<20)			# Choose top 20
				  .map(lambda ((k),v):k))				# Only choose endpoints
				  
endpointCounts.saveAsTextFile("sparkProject/7_top20EndPoints")

sc.stop()

