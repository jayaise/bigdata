import org.apache.spark.mllib.util.MLUtils
import org.apache.spark.mllib.linalg.{Vector, Vectors}
import org.apache.spark.mllib.regression.LabeledPoint
import org.apache.spark.mllib.evaluation.MulticlassMetrics
import org.apache.spark.mllib.classification.{LogisticRegressionWithLBFGS, LogisticRegressionModel}

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



// Run training algorithm to build the model
val model = new LogisticRegressionWithLBFGS().setNumClasses(2).run(training)

// Compute raw scores on the validation set.
val predictionAndLabels = validation.map { case LabeledPoint(label, features) =>
  val prediction = model.predict(features)
  (prediction, label)
}

val metrics = new MulticlassMetrics(predictionAndLabels)

// Confusion Matrix
val confMat = metrics.confusionMatrix

// Precision
val precision = metrics.precision

// Recall

val recall = metrics.recall

// FMeasure

val fmeasure = metrics.fMeasure

// Save and load model
model.save(sc, "myModelPath")
val sameModel = LogisticRegressionModel.load(sc, "myModelPath")