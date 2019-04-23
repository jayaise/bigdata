

// Insert the following records
db.users.insertMany(
  [
     {
       _id: 1,
       name: "sue",
       age: 19,
       type: 1,
       status: "P",
       favorites: { artist: "Picasso", food: "pizza" },
       finished: [ 17, 3 ],
       badges: [ "blue", "black" ],
       points: [
          { points: 85, bonus: 20 },
          { points: 85, bonus: 10 }
       ]
     },
     {
       _id: 2,
       name: "bob",
       age: 42,
       type: 1,
       status: "A",
       favorites: { artist: "Miro", food: "meringue" },
       finished: [ 11, 25 ],
       badges: [ "green" ],
       points: [
          { points: 85, bonus: 20 },
          { points: 64, bonus: 12 }
       ]
     },
     {
       _id: 3,
       name: "ahn",
       age: 22,
       type: 2,
       status: "A",
       favorites: { artist: "Cassatt", food: "cake" },
       finished: [ 6 ],
       badges: [ "blue", "red" ],
       points: [
          { points: 81, bonus: 8 },
          { points: 55, bonus: 20 }
       ]
     },
     {
       _id: 4,
       name: "xi",
       age: 34,
       type: 2,
       status: "D",
       favorites: { artist: "Chagall", food: "chocolate" },
       finished: [ 5, 11 ],
       badges: [ "red", "black" ],
       points: [
          { points: 53, bonus: 15 },
          { points: 51, bonus: 15 }
       ]
     },
     {
       _id: 5,
       name: "xyz",
       age: 23,
       type: 2,
       status: "D",
       favorites: { artist: "Noguchi", food: "nougat" },
       finished: [ 14, 6 ],
       badges: [ "orange" ],
       points: [
          { points: 71, bonus: 20 }
       ]
     },
     {
       _id: 6,
       name: "abc",
       age: 43,
       type: 1,
       status: "A",
       favorites: { food: "pizza", artist: "Picasso" },
       finished: [ 18, 12 ],
       badges: [ "black", "blue" ],
       points: [
          { points: 78, bonus: 8 },
          { points: 57, bonus: 7 }
       ]
     }
  ]
)


// Select all documents

db.users.find( {} )
db.users.find()

// the following query returns the documents where status is A
// select * from usere where status='A'
db.users.find( { status: "A" } , {name:1, age:1, status:1} )

// You can specify conditions using operators
// The following example retrieves all documents from the users collection where status equals either "P" or "D".
db.users.find( { status: { $in: [ "P", "D" ] } } )

// Retrieve all the documents where status equals "A" and age is less than 30
// lt refers to less than 
// gt; greater than 
// lte; less than or equal to
// gte; greater than equal to
// ne; not equal
db.users.find( { status: "A", age: { $lt: 30 } } )


// Or condition
// The following example retrieves all documents in the collection where the status equals "A" or age is less than ($lt) 30:


db.users.find(
   {
     $or: [ { status: "A" }, { age: { $lt: 30 } } ]
   }
)


// And Or condition
// All documents where status is A and (age <30 or type=1)
db.users.find(
   {
     status: "A",
     $or: [ { age: { $lt: 30 } }, { type: 1 } ]
   }
)

// Query on embedded documents
// When the field is a nested, embedded document, use <field>:<value>. Field is an embedded document, value is the document to match
// In favorites field, where artist is picasso and food is pizza.
db.users.find( { favorites: { artist: "Picasso", food: "pizza" } } )

// Use dot notation to 	address a specific field
db.users.find( { "favorites.artist": "Picasso","favorites.food": "pizza" } )

// Query array
// To specify equality match on an array, use the query document { <field>: <value> } where <value> is the array to match. Equality matches on the array require that the array field match exactly the specified <value>, including the element order.
db.users.find( { badges: [ "blue", "black" ] } )


// Match an array element
db.users.find( { badges: "black" } )

// Match a specific position element of array. Use dot notation to access fields
db.users.find( { "badges.0": "black" } )

//Single Element Satisfies the Criteria

//$ElemMatch to specify multiple criteria, where exactly one matches

// The following example queries for documents where the finished array contains at least one element that is greater than ($gt) 15 and less than ($lt) 20:

db.users.find( { finished: { $elemMatch: { $gt: 15, $lt: 20 } } } )

// Combination of Elements Satisfies the Criteria

// The following example queries for documents where the finished array contains elements that in some combination satisfy the query conditions; e.g., one element can satisfy the greater than 15 condition and another element can satisfy the less than 20 condition, or a single element can satisfy both:


db.users.find( { finished: { $gt: 15, $lt: 20 } } )


// Array of Embedded Documents

// use mutiple dot operators to access
// The following example selects all documents where the points contains an array whose first element (i.e. index is 0) is a document that contains the field points whose value is less than or equal to 55
db.users.find( { 'points.0.points': { $lte: 55 } } )
//Match a Field Without Specifying Array Index
db.users.find( { 'points.points': { $lte: 55 } } )

//Specify Multiple Criteria for Array of Documents
//The following example queries for documents where the points array has at least one embedded document that contains both the field points less than or equal to 70 and the field bonus equal to 20

db.users.find( { points: { $elemMatch: { points: { $lte: 70 }, bonus: 20 } } } )

//Combination of Elements Satisfies the Criteria
// one element satisfies the points less than or equal to 70 condition and another element satisfies the bonus equal to 20 condition, or a single element satisfies both criteria:

db.users.find( { "points.points": { $lte: 70 }, "points.bonus": 20 } )
