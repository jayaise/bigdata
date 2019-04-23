db.inventory.insert([
   { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
   { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "A" },
   { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
   { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
   { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" }
]);

   
db.inventory.find()
db.inventory.find( {} )

db.inventory.find( { status: "D" } )
db.inventory.find( { status: { $in: [ "A", "D" ] } } )

db.inventory.find( { status: "A", qty: { $lt: 30 } } )

db.inventory.find( { $or: [ { status: "A" }, { qty: { $lt: 30 } } ] } )
db.inventory.find( { $and: [ { status: "A" }, { qty: { $lt: 30 } } ] } )

db.inventory.find( {
     status: "A",
     $or: [ { qty: { $lt: 30 } }, { item: /^p/ } ]
} )

db.inventory.find( {
     status: { $ne: "A"}
} )


db.inventory.find( { size: { h: 14, w: 21, uom: "cm" } } )
db.inventory.find(  { size: { w: 21, h: 14, uom: "cm" } }  )

db.inventory.find( { "size.uom": "in" } )
db.inventory.find( { "size.h": { $lt: 15 } } )

db.inventory.find( { "size.h": { $lt: 15 }, "size.uom": "in", status: "D" } )

// Query an array
db.inventory.insert([
   { item: "journal", qty: 25, tags: ["blank", "red"], dim_cm: [ 14, 21 ] },
   { item: "notebook", qty: 50, tags: ["red", "blank"], dim_cm: [ 14, 21 ] },
   { item: "paper", qty: 100, tags: ["red", "blank", "plain"], dim_cm: [ 14, 21 ] },
   { item: "planner", qty: 75, tags: ["blank", "red"], dim_cm: [ 22.85, 30 ] },
   { item: "postcard", qty: 45, tags: ["blue"], dim_cm: [ 10, 15.25 ] }
]);
 
//  Exact match   
db.inventory.find( { tags: ["red", "blank"] } )

// Not exact match
db.inventory.find( { tags: { $all: ["red", "blank"] } } )

// Query array for an element
db.inventory.find( { tags: "red" } )
db.inventory.find( { dim_cm: { $gt: 25 } } )

//Query an Array with Compound Filter Conditions on the Array Elements
db.inventory.find( { dim_cm: { $gt: 15, $lt: 20 } } )


db.inventory.find( { dim_cm: { $elemMatch: { $gt: 22, $lt: 30 } } } )

db.inventory.find( { "dim_cm.1": { $gt: 25 } } )

db.inventory.find( { "tags": { $size: 3 } } )


