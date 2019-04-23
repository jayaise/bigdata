#----------- 29. top 20 frequent hosts per day?------------

# Key: day, host, value:1
dayWiseHostsVisits = (parsed_logs
                  .map(lambda log: ((log.date_time.day,log.host), 1)) # Create key value pairs
                  .reduceByKey(lambda a, b : a + b))                  # For each day, for each hosts, count.

# User defined function to get top 20
def top20Hosts(x):
	x=list(x)
	if(len(x)<=20): # If number of users in the day is less than 20, do nothing
		return(x)
	else:	
		x1=sorted(x, key=lambda x: x[1]) # Sort on values
		lst20 = [item[0] for item in x1] # Now only pick keys which is host name
		return(lst20[0:19])              # Return 20

# Now make key as day, value: host, count		
dayWiseHostsVisits = dayWiseHostsVisits.map(lambda (k,v):(k[0],[k[1],v]))	

# Group on day		
dayWiseGroup = dayWiseHostsVisits.groupByKey()

# For each day, pass hosts and count information to top20Hosts function, and pick top 20	
DayWisetop20Users =dayWiseGroup.map(lambda x: [x[0],top20Hosts(x[1])])

# Save to HDFS
DayWisetop20Users.saveAsTextFile("sparkProject/15_Top20FrequentHostsPerDay")
