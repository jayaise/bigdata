# create key: day and value: contentsize using map.

#- - - - - - - - - -                        : (-,-)
content_sizes1 = parsed_logs.map(lambda log: (log.date_time.day,log.content_size))

# GroupByKey, to group all content sizes day wise.
content_sizesDayWise = content_sizes1.groupByKey()

# Foreach group, generate total downloaded, average, max and minimum
ContentSizestatsDayWise = (content_sizesDayWise
.map(lambda (group,values):(group,sum(values),sum(values)*1.0/len(values),max(values),min(values))))

# Save output into HDFS
ContentSizestatsDayWise.saveAsTextFile("sparkProject/ContentSizestatsDayWise")

# stop sparkcontext

sc.stop()
