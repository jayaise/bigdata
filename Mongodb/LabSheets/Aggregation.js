// match

db.restaurantData.aggregate 
(
 [
  {
     "$match":
     {
        "borough":"Bronx"
     }
  }
 ]
)

//find out all the records where borough is Bronx and cuisine is Bakery
db.restaurantData.aggregate 
(
 [
  {
     "$match":
     {
        $and:[{borough:'Bronx'},{cuisine: "Bakery"}]

     }
  }
 ]
)

// project particular fields
db.restaurantData.aggregate 
(
 [
  {
       "$project":{_id:0,name : 1,grades:1}
  }
 ]
)

// select name and grades where borough is Bronx
db.restaurantData.aggregate 
(
 [
  {
     "$match":
     {
        "borough":"Bronx"
     }
  },
  {
       "$project":
     {
         _id:0,name : 1,grades:1
     }
  }
 ]
)

// unwind

db.restaurantData.aggregate 
(
 [
  {
     "$match":
     {
        "borough":"Bronx"
     }
  },
  {
       "$unwind":"$grades"
  }
 ]
)

// pipelinig match, unwind and project
db.restaurantData.aggregate 
(
 [
  {
     "$match":
     {
        "borough":"Bronx"
     }
  },
  {
       "$unwind":"$grades"
  },
  {
       
         "$project":{_id:0,name : 1,grades:1}
        
  }
 ]
)

// includeArrayIndex parameter
db.restaurantData.aggregate 
(
 [
  {
     "$match":
     {
        "borough":"Bronx"
     }
  },
  {
       "$unwind":{path:	"$grades", includeArrayIndex: "arrayIndex" }
  }
 ]
)

// group
db.Student.insert({StudentName : "Vijay",Section : "A",Marks:70,Subject:["Hindi","English","Math"]})
db.Student.insert({StudentName : "Gaurav",Section : "A",Marks:90,Subject:["English"]})
db.Student.insert({StudentName : "Ajay",Section : "A",Marks:70,Subject:["Math"]})
db.Student.insert({StudentName : "Ankur",Section : "B",Marks:10,Subject:["Hindi"]})
db.Student.insert({StudentName : "Sunil",Section : "B",Marks:70,Subject:["Math"]})
db.Student.insert({StudentName : "Preeti",Section : "C",Marks:80,Subject:["Hindi","English"]})
db.Student.insert({StudentName : "Anuj",Section : "C",Marks:50,Subject:["English"]})
db.Student.insert({StudentName : "Palka",Section : "D",Marks:40,Subject:["Math"]})
db.Student.insert({StudentName : "Soniya",Section : "D",Marks:20,Subject:["English","Math"]})

// Suppose we want to find out Total Marks group by Section then we will use $group as below

db.Student.aggregate ([
   {
      "$group":
      {
         "_id":
         {
            "Section" : "$Section"
         },
         "TotalMarks":
         {
            "$sum": "$Marks"
         }
      }
   }
])

// If we want to fetch Total Marks for only Section 'A' then we can pass a $match also. 

db.Student.aggregate ([
   {
       "$match":{Section :'A'}
   },
   {
      "$group":
      {
         "_id":
         {
            "Section" : "$Section"
         },
         "TotalMarks":
         {
            "$sum": "$Marks"
         }
      }
   }
])

//	Suppose we want to fetch the count of students in each section and Total marks and average marks as well 


db.Student.aggregate ([
  
   {
      "$group":
      {
         "_id":
         {
            "Section" : "$Section"
         },
         "TotalMarks":
         {
            "$sum": "$Marks"
         },
         "Count":{ "$sum" : 1},
         "Average" : {"$avg" : "$Marks"}
      }
   }
])

// If we want to rename the column Names 
// in above query(Section to SectionName and TotalMarls to Total)  
// then we can use $project along with $group as below
db.Student.aggregate ([
  
   {
      "$group":
      {
         "_id":
         {
            "Section" : "$Section"
         },
         "TotalMarks":
         {
            "$sum": "$Marks"
         },
         "Count":{ "$sum" : 1},
         "Average" : {"$avg" : "$Marks"}
      }
   },
   {
       "$project" : 
       {
           "SectionName" : "$_id.Section",
           "Total" : "$TotalMarks"
       }
   }
])

// If we want to  sort the result in descending order by SectionName then we can use $sort 
db.Student.aggregate ([
   {
      "$group":
      {
         "_id":
         {
            "Section" : "$Section"
         },
         "TotalMarks":
         {
            "$sum": "$Marks"
         },
         "Count":{ "$sum" : 1},
         "Average" : {"$avg" : "$Marks"}
      }
   },
   {
       "$project" : 
       {
           "SectionName" : "$_id.Section",
           "Total" : "$TotalMarks"
       }
   },
   {
       "$sort":{"SectionName":-1}
   }
])


// 	If we want to sort the documents as in above query and we need
// to pass only 2 documents to the next stage of pipeline then we use $limit .
db.Student.aggregate ([
  
   {
      "$group":
      {
         "_id":
         {
            "Section" : "$Section"
         },
         "TotalMarks":
         {
            "$sum": "$Marks"
         },
         "Count":{ "$sum" : 1},
         "Average" : {"$avg" : "$Marks"}
      }
   },
   {
       "$project" : 
       {
           "SectionName" : "$_id.Section",
           "Total" : "$TotalMarks"
       }
   },
   {
       "$sort":{"SectionName":-1}
   },
   {
       "$limit" : 2
   }
])

// In the above example if we want to skip first 1 document and 
// then we want to pass the next 2 documents to the next stage of
// pipeline then we  will use the below query
db.Student.aggregate ([
  
   {
      "$group":
      {
         "_id":
         {
            "Section" : "$Section"
         },
         "TotalMarks":
         {
            "$sum": "$Marks"
         },
         "Count":{ "$sum" : 1},
         "Average" : {"$avg" : "$Marks"}
      }
   },
   {
       "$project" : 
       {
           "SectionName" : "$_id.Section",
           "Total" : "$TotalMarks"
       }
   },
   {
       "$sort":{"SectionName":-1}
   },
   {
       "$skip" : 1
   },
   {
       "$limit" : 2
   }
])


// Suppose we have two collection named Country and City as below

db.Country.insert({"_id":1,"Name":"India"})
db.Country.insert({"_id":2,"Name":"US"})
db.Country.insert({"_id":3,"Name":"UK"})
db.Country.insert({"_id":4,"Name":"Australia"})

db.City.insert({"_id":1,"Name":"Delhi","CountryID":1})
db.City.insert({"_id":2,"Name":"Noida","CountryID":1})
db.City.insert({"_id":3,"Name":"Chicago","CountryID":2})
db.City.insert({"_id":4,"Name":"London","CountryID":3})
db.City.insert({"_id":5,"Name":"Bristol","CountryID":3})
db.City.insert({"_id":6,"Name":"Sydney","CountryID":4})

// If we want to fetch all the cities associated with countries then we will use $lookup as below
db.City.aggregate([
    {
      $lookup:
        {
          from: "Country",
          localField: "CountryID",
          foreignField: "_id",
          as: "Country"
        }
   }
])


// lookup

db.Country.insert({"_id":1,"Name":"India"})
db.Country.insert({"_id":2,"Name":"US"})
db.Country.insert({"_id":3,"Name":"UK"})
db.Country.insert({"_id":4,"Name":"Australia"})

db.City.insert({"_id":1,"Name":"Delhi","CountryID":1})
db.City.insert({"_id":2,"Name":"Noida","CountryID":1})
db.City.insert({"_id":3,"Name":"Chicago","CountryID":2})
db.City.insert({"_id":4,"Name":"London","CountryID":3})
db.City.insert({"_id":5,"Name":"Bristol","CountryID":3})
db.City.insert({"_id":6,"Name":"Sydney","CountryID":4})


db.City.aggregate([
    {
      $lookup:
        {
          from: "Country",
          localField: "CountryID",
          foreignField: "_id",
          as: "Country"
        }
   }
])


