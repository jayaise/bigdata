

# Import Libraries
from pyspark import SparkConf, SparkContext

# Create spark context object
sc = SparkContext()

sourceRDD = sc.parallelize([1,2,3,5,6,2,3,1,5,6,9,11])
print(sc)
print("sourceRDD output : ",sourceRDD)
print(sourceRDD.collect())

#------------map---------------
mapRDD = sourceRDD.map(lambda a:a+1)
mapRDDResult = mapRDD.collect()
print("")
print("Map output : ",mapRDDResult)
print("")

#---------------------filter----------------
filterRDD = sourceRDD.filter(lambda a:a%2==0)
filterRDDResult = filterRDD.collect()
print("")
print("filter output : ",filterRDDResult)
print("")

#---------------------distinct----------------
distinctRDD = sourceRDD.distinct()
distinctRDDResult = distinctRDD.collect()
print("")
print("distinct output : ",distinctRDDResult)
print("")

#---------------------union----------------
rdd1 = sc.parallelize([1,3,4,6,1,2])
rdd2 = sc.parallelize([11,31,14,16,1,2])
unionRDD = rdd1.union(rdd2)
unionRDDResult = unionRDD.collect()
print("")
print("union output : ",unionRDDResult)
print("")


#---------------------intersection----------------
interRDD = rdd1.intersection(rdd2)
interRDDResult = interRDD.collect()
print("")
print("intersection output : ",interRDDResult)
print("")


#-------------------map vs flatMap--------------------
sourceRDD1 = sc.parallelize(["a b c","b a c","d a b e r"])
mapRDD1 = sourceRDD1.map(lambda x:x.split(" "))
mapRDD1Result = mapRDD1.collect()

flatMapRDD1 = sourceRDD1.flatMap(lambda x:x.split(" "))
flatMapRDD1Result = flatMapRDD1.collect()
print("")
print("mapRDD1Result output : ",mapRDD1Result)
print("flatMapRDD1Result output : ",flatMapRDD1Result)
print("")



#login to terminals
#mkdir sparkday1
# cd sparkday1
# copy this program to remote sparkday1 folder
# python transformation.py
# spark-submit transformation.py > transformation.output
# cat transformation.out


print("----------------Actions---------------------------")
#-------------------Reduce-------------------------
reduceResult = sourceRDD.reduce(lambda a,b:a+b)
countResult = sourceRDD.count()
avgValue = reduceResult*1.0/countResult
firstElement = sourceRDD.first()
take5Element = sourceRDD.take(5)
maxResult = sourceRDD.max()
minResult = sourceRDD.min()
asc5Result = sourceRDD.takeOrdered(5)
desc5Result = sourceRDD.takeOrdered(5,lambda x:-1*x)
print("")

print("Reduce output : ",reduceResult)
print("countResult output : ",countResult)
print("avgValue output : ",avgValue)
print("firstElement output : ",firstElement)
print("take5Element output : ",take5Element)
print("maxResult output : ",maxResult)
print("minResult output : ",minResult)
print("asc5Result output : ",asc5Result)
print("desc5Result output : ",desc5Result)
print("")


#-------------------------key value transformation------------------

print("----------------Key Value transformation---------------------------")

sourceKVRDD = sc.parallelize([("a",1),("c",2),("b",4),("c",11),("d",2),("e",4),("d",10),("e",5),("k",11,),("k",14),("c",12),("b",14)])


#-------------------------Reducebykey--------------
redByKeySUMRDD =sourceKVRDD.reduceByKey(lambda a,b:a+b)
redByKeyMaxRDD =sourceKVRDD.reduceByKey(lambda a,b:max(a,b))
redByKeyMinRDD =sourceKVRDD.reduceByKey(lambda a,b:min(a,b))

print("Reduce by key sum result::::::::")
for i in redByKeySUMRDD.collect():
	print(i)

print("Reduce by key max result::::::::")
for i in redByKeyMaxRDD.collect():
	print(i)

print("Reduce by key min result::::::::")
for i in redByKeyMinRDD.collect():
	print(i)

#-------------------------Group by transformation------------------

print("----------------Group by transformation---------------------------")

grpByKeySUMRDD = sourceKVRDD.groupByKey()
summaryRDD =grpByKeySUMRDD.map(lambda (k,v):(k,max(v),min(v),sum(v),(sum(v)*1.0/len(v))))

print("Group by key min summary ::::::::")
print("Group by key max min sum avg ::::::::")
for i in summaryRDD.collect():
	print(i)

	
#-------------------------sort by transformation------------------------

print("----------------sort by transformation---------------------------")

sortByKeyASCRDD = sourceKVRDD.sortByKey()
sortByKeyDESCRDD = sourceKVRDD.sortByKey(False)



print("Sort by key ascending order ::::::::")
for i in sortByKeyASCRDD.collect():
	print(i)

print("Sort by key descending order ::::::::")
for i in sortByKeyDESCRDD.collect():
	print(i)

sc.stop()
