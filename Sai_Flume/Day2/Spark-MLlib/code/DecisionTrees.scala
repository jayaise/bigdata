import org.apache.spark.mllib.tree.DecisionTree
import org.apache.spark.mllib.tree.model.DecisionTreeModel
import org.apache.spark.mllib.util.MLUtils
import org.apache.spark.mllib.regression.LabeledPoint
import org.apache.spark.mllib.evaluation.MulticlassMetrics

// Load data
val data = sc.textFile("/home/training/Desktop/Bank_Classification_data.csv")
val parsedData = data.map { line =>
  val parts = line.split(';')
  LabeledPoint(parts(1).toDouble, Vectors.dense(parts(0).split(',').map(_.toDouble)))
}.cache()

// Split parsedData into training (80%), validation (10%) and testing(10%)
val splits = parsedData.randomSplit(Array(0.8, 0.1,0.1), seed = 11L)
val training = splits(0).cache()
val validation = splits(1).cache()
val test = splits(1)

// Data Check
training.take(1)
validation.take(1)


// Train a DecisionTree model.
//  Empty categoricalFeaturesInfo indicates all features are continuous.
val numClasses = 2
val categoricalFeaturesInfo = Map[Int, Int]()
val impurity = "gini"
val maxDepth = 5
val maxBins = 32

val model = DecisionTree.trainClassifier(training, numClasses, categoricalFeaturesInfo,
  impurity, maxDepth, maxBins)

// Evaluate model on validation instances and compute test error
val labelAndPreds = validation.map { point =>
  val prediction = model.predict(point.features)
  (point.label, prediction)
}
//metrics
val metrics = new MulticlassMetrics(labelAndPreds)

// Confusion Matrix
val confMat = metrics.confusionMatrix

// Precision
val precision = metrics.precision

// Recall

val recall = metrics.recall

// FMeasure

val fmeasure = metrics.fMeasure

// model 

model.toString

// Rule matrix
model.toDebugString

//Top Node
model.topNode