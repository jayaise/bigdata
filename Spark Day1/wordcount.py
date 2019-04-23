

# Import Libraries
from pyspark import SparkConf, SparkContext

# Create spark context object
sc = SparkContext()

# Create RDD
fileRDD = sc.textFile("SparkData/UN.txt")

# Word Count
(fileRDD.flatMap(lambda line:line.split(" "))

		.map(lambda word: (word.lower(),1))

		.reduceByKey(lambda a,b:a+b)

		.map(lambda (k,v):(v,k))

		.sortByKey(False)

		.map(lambda (k,v):(v,k))

		.saveAsTextFile("SparkResults/wordcount/"))

sc.stop()