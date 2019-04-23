use test 

db.inventory.insertOne(
   { item: "canvas", qty: 100, tags: ["cotton"], size: { h: 28, w: 35.5, uom: "cm" } }
)
   
db.inventory.insertMany([
   { item: "journal", qty: 25, tags: ["blank", "red"], size: { h: 14, w: 21, uom: "cm" } },
   { item: "mat", qty: 85, tags: ["gray"], size: { h: 27.9, w: 35.5, uom: "cm" } },
   { item: "mousepad", qty: 25, tags: ["gel", "blue"], size: { h: 19, w: 22.85, uom: "cm" } }
])

db.inventory.find()
   
db.inventory.insert(
   { item: "notebook", qty: 50, tags: ["red", "hard cover", "plain"], size: { h: 8.5, w: 11, uom: "in" } }
)
   


db.inventory.insert([
   { item: "paper", qty: 100, tags: ["red", "blank", "plain"], size: { h: 11.69 , w: 16.53, uom: "in" } },
   { item: "planner", qty: 75, tags: ["blank", "red"], size: { h: 22.85, w: 30, uom: "cm" } },
   { item: "postcard", qty: 45, tags: ["blue"], size: { h: 10, w: 15.25, uom: "cm" } }
])

