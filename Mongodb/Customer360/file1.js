// For each state, find out number of customers, average age, average salaried, number of married customers
db.Customer360.aggregate 
(
 [
 // select required data to speed up the process, minimize memory usage
 {
       "$project":
     {
         _id:0,address:{stateid : 1},demographics:{age:1,salary:1,marry:1}
     }
  },
  {
      "$group":
      {
         "_id":
         {
            "Section" : "$address.stateid"
         },
         "AvgAge":
         {
            "$avg": "$demographics.age"
         },
         "AvgSalary":
         {
            "$avg": "$demographics.salary"
         },
         "NumberOfCustomers":
         {
            "$sum": 1
         }
		 
      }
   }
  
  
 ]
)

// Repeat the same for each city and zip code by making changes in project and group
