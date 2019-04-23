//Find the number of products each customer is holding.
db.Customer360.aggregate(
   [
      {
         $project: {
            _id: 1,
            numberOfProducts: { $size: "$demographics.product" }
         }
      }
   ]
)

//Find the number of customers in different age bins. Bin width should be set to 10.
db.Customer360.aggregate(
   {$project: {
        ageLowerBound: {$subtract:["$demographics.age", {$mod:["$demographics.age",10]}]}}
   },
   {$group: {
       _id:"$ageLowerBound", 
       count:{$sum:1}
   }
})

//Find the number of customers for each product. 

db.Customer360.aggregate 
(
 [
 // select required data to speed up the process, minimize memory usage
 {
       "$project":
     {
         _id:1,demographics:{products:1}
     }
  },
  {
       "$unwind":"$demographics.products"
  },
  {
      "$group":
      {
         "_id":
         {
            "Section" : "$demographics.products"
         },
         "NumberOfCustomers":
         {
            "$sum": 1
         }
		 
      }
   }
  
  
  ]
  )