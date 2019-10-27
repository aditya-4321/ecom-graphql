var express=require("express")
    app=express()
    mongoose =require('mongoose')
    graphqlHTTP = require('express-graphql')

var  { buildSchema } = require('graphql')
mongoose.connect('mongodb://localhost/project', {
  useNewUrlParser: true,
  useUnifiedTopology: true
},function(){
    console.log("Connected to the mongodb Database")
});

var productschema=new mongoose.Schema({
    _id:String,
    ancestor:[],
    parent:String
})
var Product=mongoose.model("product",productschema)


// Product.insertMany([
// //2nd Level             
//     {
//                         _id:"TV",
//                         ancestors:["Product","Electronics"], 
//                         parent: "Product" 
//                     }
//                     ,
//                     {
//                         _id:"Gamepad",
//                         ancestors:["Product","Electronics"], 
//                         parent: "Product" 
//                     }
//                     ,
//                     {
//                         _id:"Refrigirator",
//                         ancestors:["Product","Electronics"], 
//                         parent: "Product" 
//                     },
// //2nd level Branch 2
// {
//                         _id:"Mens Fashion",
//                         ancestors:["Product","Clothing"], 
//                         parent: "Clothing" 
//                         },                       
//                         {
//                             _id:"Womens Fashion",
//                             ancestors:["Product","Clothing"], 
//                             parent: "Clothing" 
//                         },

// //1st Level
//                  {
//                         _id:"Utencils",
//                         ancestors:["Product"], 
//                         parent: "Product"
//                      },
//                     {   
//                         _id:"Electronics",
//                         ancestors:["Product"], 
//                         parent: "Product"
//                     },
//                     {_id:"Products",
//                     ancestors:[], 
//                     parent: null }
//                 ]
//                             ,function(err,newproduct){
//                                 if(err){
//                                     console.log(err)
//                                 } else{
//                                     console.log(newproduct)
//                                 }
// })

var a=[
    {
            _id:"TV",
            ancestor:["Product","Electronics"], 
            parent: "Product" 
        }
        ,
        {
            _id:"Gamepad",
            ancestor:["Product","Electronics"], 
            parent: "Product" 
        }
        ,
        {
            _id:"Refrigirator",
            ancestor:["Product","Electronics"], 
            parent: "Product" 
        }
]


var schema=buildSchema(`
    input productinput{
        _id:String!,
        ancestor:[String!]!,
        parent:String
    }
    type Product{
        _id:String!,
        ancestor:[String!]!,
        parent:String!,
        returnParent:String!,
        returnAncestor:[String!]!
    }
    type Mutation{
        createProduct(input:productinput): Product
    }
    type Query{
        getProduct(_id:String!):Product
    }
`    
)

var root = {
    createProduct: function({input}){
        console.log("This is input",input)
        var product=new Product({
            _id:input._id,
            ancestor:input.ancestor,
            parent:input.parent
        })

        product.save().then(data=>(console.log(data))).catch(err=>console.log(err))
        return product
    },
    getProduct: function (inputdata) {
        return Product.findOne({_id:inputdata},(err, data)=>{
            if(err){
                console.log("fail")
            } else{
                return (data)
            }
        })
    }
  }

// var root={
//     hello:()=>{
//         return "Hello World"
//     }
// }
app.use('/graphql',graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))
app.listen(4000,()=>{
    console.log("Server has Started")
})

