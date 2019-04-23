#-------- Content size stats------------------
#Select content size 
content_sizes = parsed_logs.map(lambda log: log.content_size)
#average = sum/count , min and max functions to get minimum and maximum content sizes
print 'Content Size Avg: %i, Min: %i, Max: %s' % (
    content_sizes.reduce(lambda a, b : a + b) / content_sizes.count(), #sum/count will give average
    content_sizes.min(), # min action to get minimum
    content_sizes.max()) # max action to get maximum
	
sc.stop()