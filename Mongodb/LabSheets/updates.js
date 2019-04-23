db.restaurant.deleteOne({ "_id" : 1 })
// insert data
db.restaurant.insert([{ "_id" : 1, "name" : "Central Perk Cafe", "Borough" : "Manhattan" },
{ "_id" : 2, "name" : "Rock A Feller Bar and Grill", "Borough" : "Queens", "violations" : 2 },
{ "_id" : 3, "name" : "Empire State Pub", "Borough" : "Brooklyn", "violations" : 0 }])

// The following operation updates a single document where name: "Central Perk Cafe" with the violations field:
try {
   db.restaurant.updateOne(
      { "name" : "Central Perk Cafe" },
      { $set: { "violations" : 3 } }
   );
} catch (e) {
   print(e);
}
db.restaurant.find({"name" : "Central Perk Cafe"})
// insert data
db.restaurant1.insert([{ "_id" : 1, "name" : "Central Perk Cafe", "Borough" : "Manhattan", "violations" : 3 },
{ "_id" : 2, "name" : "Rock A Feller Bar and Grill", "Borough" : "Queens", "violations" : 2 },
{ "_id" : 3, "name" : "Empire State Pub", "Borough" : "Brooklyn", "violations" : "0" }]
)

// The following operation attempts to update the document with name : "Pizza Rat's Pizzaria", while upsert: true 

try {
   db.restaurant1.updateOne(
      { "name" : "Pizza Rat's Pizzaria" },
      { $set: {"_id" : 4, "violations" : 7, "borough" : "Manhattan" } },
      { upsert: true }
   );
} catch (e) {
   print(e);
}
db.restaurant1.find()

// insert data
db.restaurant2.insert([
{ "_id" : 1, "name" : "Central Perk Cafe", "violations" : 3 },
{ "_id" : 2, "name" : "Rock A Feller Bar and Grill", "violations" : 2 },
{ "_id" : 3, "name" : "Empire State Sub", "violations" : 5 },
{ "_id" : 4, "name" : "Pizza Rat's Pizzaria", "violations" : 8 }])
// The following operation updates all documents where violations are greater than 4 and $set a flag for review:
try {
   db.restaurant2.updateMany(
      { violations: { $gt: 4 } },
      { $set: { "Review" : true } }
   );
} catch (e) {
   print(e);
}
db.restaurant2.find({violations: { $gt: 4 }})
// insert data
db.inspectors.insert([{ "_id" : 92412, "inspector" : "F. Drebin", "Sector" : 1, "Patrolling" : true },
{ "_id" : 92413, "inspector" : "J. Clouseau", "Sector" : 2, "Patrolling" : false },
{ "_id" : 92414, "inspector" : "J. Clouseau", "Sector" : 3, "Patrolling" : true },
{ "_id" : 92415, "inspector" : "R. Coltrane", "Sector" : 3, "Patrolling" : false }
])

// The following operation updates all documents with Sector greater than 4 and inspector equal to "R. Coltrane":

try {
   db.inspectors.updateMany(
      { "Sector" : { $gt : 4 }, "inspector" : "R. Coltrane" },
      { $set: { "Patrolling" : false } },
      { upsert: true }
   );
} catch (e) {
   print(e);
}

// replaceone
// insert data
db.restaurant3.insert([
{ "_id" : 1, "name" : "Central Pork Cafe", "Borough" : "Manhattan" },
{ "_id" : 2, "name" : "Rock A Feller Bar and Grill", "Borough" : "Queens", "violations" : 2 },
{ "_id" : 3, "name" : "Empire State Pub", "Borough" : "Brooklyn", "violations" : 0 }])

try {
   db.restaurant3.replaceOne(
      { "name" : "Central Pork Cafe" },
      { "name" : "Central Perk Cafe", "Borough" : "Manhattan1" }
   );
} catch (e){
   print(e);
}

db.restaurant3.find()


db.restaurant4.insert([
{ "_id" : 1, "name" : "Central Perk Cafe", "Borough" : "Manhattan",  "violations" : 3 },
{ "_id" : 2, "name" : "Rock A Feller Bar and Grill", "Borough" : "Queens", "violations" : 2 },
{ "_id" : 3, "name" : "Empire State Pub", "Borough" : "Brooklyn", "violations" : 0 }])

The following operation attempts to replace the document with name : "Pizza Rat's Pizzaria", with upsert : true:

try {
   db.restaurant.replaceOne(
      { "_id" : 1 },
      { "_id": 4, "name" : "Pizza Rat's Pizzaria", "Borough" : "Manhattan", "violations" : 8 },
      { upsert: true }
   );
} catch (e){
   print(e);
}

