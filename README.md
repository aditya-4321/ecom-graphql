# ecom-graphql
Tech Stack: Node.js, Graphql, MongoDB
dependencies: Express.js,express-graphql,graphql,mongoose
Structure:Mongodb tree structure is used
A user can add an element to the products collection
products collection has an
{
  _id: String
  ancestor:[]
  parent:String
  }
A user can query using graphql by _id field
A user can add item to the mutation using the given structure.
