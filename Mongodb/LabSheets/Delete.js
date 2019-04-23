// insert data
db.inventory.insert( [
   { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
   { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "P" },
   { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
   { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
   { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" },
   { item: "diary", qty: 67, size: { h: 14, w: 15.25, uom: "cm" }, status: "A" },
   { item: "notebook1", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "P" },
]);

// delete one document which has status A

db.inventory.deleteOne({ status : "A" })

// Only one document is removed
db.inventory.find()

// delete one document which has status A using remove method

db.inventory.remove(
{ status : "A"
 },
 {
  justOne : true}
)

// Only one document is removed
db.inventory.find()

// delete all the documents with status D
db.inventory.deleteMany({ status : "D" })


// delete all the documents with status P usind remove
db.inventory.remove({ status : "P" })

// Drop the collection
db.inventory.drop()

