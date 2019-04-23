//1.Number of customers who have 1, 2, 3 and 4 products.
db.Customer360.aggregate(
   [
      {
         $project: {
            _id: 1,
            numberOfProducts: { $size: "$demographics.products" }
         }
      },{$group: {
   _id:"$numberOfProducts", 
       count:{$sum:1}
	  }}
   ]
)
//2.Number of customers who have at least 2, 3 and 4 products.
db.Customer360.aggregate(
   [
      {
         $project: {
            _id: 1,
			"dummy":1
            numberOfProducts: { $size: "$demographics.products" }
         }
      },{
     "$match":
     {
        "numberOfProducts":{$gte:2}
     }
  },
    {
      $count: "numberOfProducts"
    }

   ]
)
// do the same for 3 and 4

//3.Number of customers who have credit and loan account.
db.Customer360.find( { "demographics.products":{ $all: [ "credit", "loan"] } } )
db.Customer360.find( { "demographics.products":{ $all: [ "credit", "loan"] } } ).count()


//4.Number of customers who have credit and loan account but not savings.
db.Customer360.find( { "demographics.products":[
{$neq: "savings" },
{ $all: [ "credit", "loan"] }
]
} 
)
