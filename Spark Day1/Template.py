

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
sourceRDD1 = sc.parallelize(["a b c",b a c","d a b e r"])
mapRDD1 = sourceRDD1.map(lambda x:x.split(" "))
mapRDD1Result = mapRDD1.collect()

flatMapRDD1 = sourceRDD1.flatMapRDD1(lambda x:x.split(" "))
flatMapRDD1Result = flatMapRDD1.collect()
print("")
print("mapRDD1Result output : ",mapRDD1Result)
print("flatMapRDD1Result output : ",flatMapRDD1Result)
print("")



#login to terminals
#mkdir sparkday1
# cd sparkday1
# copy this program to remote sparkday1 folder
# python transformation.pyspark#spark-submit transformation.py > transformation.output
# cat transformation.out

sc.stop()