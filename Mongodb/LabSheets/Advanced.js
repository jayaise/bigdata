// grouping operation
db.restaurantData.aggregate(
    {
	$group : {_id : "$cuisine", total : { $sum : 1 }}
    }
  );

// group and sort operation  
 db.restaurantData.aggregate(
    {
	$group : {_id : "$cuisine", total : { $sum : 1 }}
    },
     {
	$sort : {total : -1}
     }
  );

// Project

db.restaurantData.aggregate( [ { $project : { borough : 1 , score : 1, grade: 1 } } ] )
  
// Count the number of docs

db.restaurantData.count()

// Count with a condition

db.restaurantData.count( { borough: "Brooklyn" } )

db.restaurantData.aggregate(
{
$match:{ borough: "Brooklyn" }
},
    {
	$group : {_id : "$borough", total : { $sum : 1 }}
    }
  );

// map reduce
// mapper function
var mapFunction1 = function() {
                       emit(this.cuisine, 1);
                   };

// reduce function
var reduceFunction1 = function(keycuisine, valuesConst) {
                          return Array.sum(valuesConst);
                      };

// map reduce					  
db.restaurantData.mapReduce(
					mapFunction1,
                     reduceFunction1,
                     { out: "map_reduce_example" }

)  
  
db.map_reduce_example.find()

// text search
// to make text search first create index.
// To perform text search queries, you must have a text index on your collection. A collection can only have one text search index, but that index can cover multiple fields.

// create index on two columns
db.restaurantData.createIndex( { street: "text", name: "text" } )
db.restaurantData.getIndexes()

//  Use the $text query operator to perform text searches on a collection with a text index.

// For example, you could use the following query to find all stores containing any terms from the list “coffee”, “shop”, and “house”:

db.restaurantData.find( { $text: { $search: "house coffee shop" } } )

// number of records
db.restaurantData.count( { $text: { $search: "house coffee shop" } } )

// exact phrase
// You can also search for exact phrases by wrapping them in double-quotes. For example, the following will find all documents containing “java” or “coffee shop”

db.restaurantData.find( { $text: { $search: "java \"coffee shop\"" } } )
db.restaurantData.count( { $text: { $search: "java \"coffee shop\"" } } )


// Term exclusion
// To exclude a word, you can prepend a “-” character. For example, to find all stores containing “java” or “shop” but not “coffee”, use the following:


db.restaurantData.find( { $text: { $search: "java shop -coffee" } } )
db.restaurantData.count( { $text: { $search: "java shop -coffee" } } )


//Sorting

//MongoDB will return its results in unsorted order by default. However, text search queries will compute a relevance score for each document that specifies how well a document matches the query.

//To sort the results in order of relevance score, you must explicitly project the $meta textScore field and sort on it:

db.restaurantData.find(
   { $text: { $search: "java coffee shop" } },
   { score: { $meta: "textScore" } }
).sort( { score: { $meta: "textScore" } } )

// return strings without coffee
db.restaurantData.find(!{ $text: { $search: "coffee" } })

// name index
db.restaurantData.createIndex({ street: "text", name: "text" },{name:"index name"})
// indexing
// single field
// 1 refers to ascending order
db.restaurantData.createIndex( { building: 1 } )

// compound indexes

db.restaurantData.createIndex( { building: 1, restaurant_id: 1 } )

db.restaurantData.getIndexes()

db.restaurantData.dropIndex()