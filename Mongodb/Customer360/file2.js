//1.Number of unique states, cities, zipcodes and streetno.
db.Customer360.distinct( "address.stateid" )
db.Customer360.distinct( "address.cityid" )
db.Customer360.distinct( "address.zipcode" )
db.Customer360.distinct( "address.streetno" )
// count
db.Customer360.distinct( "address.stateid" ).length
db.Customer360.distinct( "address.cityid" ).length
db.Customer360.distinct( "address.zipcode" ).length
db.Customer360.distinct( "address.streetno" ).length
//2.Number of unique jobs.
db.Customer360.distinct( "demographics.job" )
db.Customer360.distinct( "demographics.job" ).length
//3.Average salary,age, count of customers for each job.
db.Customer360.aggregate 
(
 [
 // select required data to speed up the process, minimize memory usage
 {
       "$project":
     {
         _id:0,demographics:{job:1,age:1,salary:1}
     }
  },
  {
      "$group":
      {
         "_id":
         {
            "job" : "$demographics.job"
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

//4.Number of married customers and unmarried customers for each job type



db.Customer360.aggregate 
(
 [
 // select required data to speed up the process, minimize memory usage
 {
       "$project":
     {
         _id:0,demographics:{job:1,marry:1}
     }
  },
  {
      "$group":
      {
         "_id":
         {
            "job" : "$demographics.job",
			"IsMarried" : "$demographics.marry",
         },
         "NumberOfCustomers":
         {
            "$sum": 1
         }
		 
      }
   }
  
  
 ]
)
