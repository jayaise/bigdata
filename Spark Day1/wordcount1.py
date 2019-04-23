# Import Libraries
from pyspark import SparkConf, SparkContext

# Create spark context object
sc = SparkContext()

#Load RDD

inputPath = ""
outputpath = ""
rawRDD = sc.textFile(inputPath)

#------------------Data Flow stages---------------
#load data
#take each line, split them on space
#form key value pairs,(word,1)
#identify a function in spark, which can do (word,count)
#identify function which can sort on values (flip key value pairs)
#store the files
# takeOrdered(10,lambda(k,v):-v)

(rawRDD.flatMap(lambda line: line.split(" "))
		.map(lambda word: (word.lower(),1))
		.reduceByKey(lambda a,b:a+b)
		.map(lambda(word,count):(count,word))
		.sortByKey(False)
		.map(lambda(count,word):word+","+str(count))
		.saveAsTextFile(outputpath)
		)
sc.stop()