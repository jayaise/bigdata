#-------- Number of Unique Hosts---------
hosts = parsed_logs.map(lambda log: log.host) # Key: host, value:1

uniqueHosts = hosts.distinct()					   # Distinct to get unique hosts

uniqueHostCount = uniqueHosts.count()			   # Count to get the number of unique hosts

print(uniqueHostCount)								
