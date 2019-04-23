#---- Counting 404 Response Codes-----------
badRecords = (parsed_logs.filter(lambda logs: logs.response_code==404).cache())
print("Number of bad records:",badRecords.count())

#---- Listing 404 Response Code Records ----
badEndpoints = badRecords.map(lambda badlogs: badlogs.endpoint)

badUniqueEndpoints = badEndpoints.distinct()

badUniqueEndpointsPick40 = badUniqueEndpoints.take(40)

print("Check on bad records:",badUniqueEndpointsPick40)

sc.stop()