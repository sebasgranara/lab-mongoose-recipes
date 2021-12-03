const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "Flan",
      level: "Easy Peasy",
      ingredients: ["butter", "milk", "sugar"],
      cuisine: "Argentina",
      dishType: "dessert",
      duration: 0,
      creator: "Sebastian",
    })
  }
  ).
  then(
    (recipe) => {
      console.log(recipe.title);
      return Recipe.insertMany(data)
    }
  ).then(
    (docs) => {
      console.log(docs);
      return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
    }
  ).then(
    (doc) => {
      console.log("Update done!");
      return Recipe.deleteOne({title:"Carrot Cake"});
    }
  ).
  then(
    ()=>{
      console.log("Delete done!");
      mongoose.connection.close();
    }
  ).
  catch(error => {
    console.error('Error connecting to the database', error);
  });
