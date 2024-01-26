const Nutrition = require('../models/nutritionmodel')
const User = require('../models/usermodel')

//creates a new post for the nutrition collection and the users list called nutrition 
async function postNutrition(req, res) {
    try {
      const { name, servingsize, calories, sodium, sugar } = req.body 
      const addedBy = req.user._id  
      const newNutrition = new Nutrition({ name, servingsize, calories, sodium, sugar, addedBy })
      const savedNutrition = await newNutrition.save()
      const user = await User.findById(addedBy)
      user.lists.nutrition.push(savedNutrition)
      await user.save()
      res.redirect('/nutrition')

    }  catch (error) {
      res.render('error')
    }
  }

  //updates the nutition by its id 
  async function updateNutrition(req, res) {
    try {
      const nutritionId = req.params.nutritionId
      const { name, servingsize, calories, sodium, sugar } = req.body 
      await Nutrition.findByIdAndUpdate(nutritionId, { name, servingsize, calories, sodium, sugar })
      res.redirect('/nutrition')

    }  catch (error) {
      res.render('error')
    }
  }

  //deletes a nutrition from the collection and the users list 
  async function deleteNutrition(req, res) {
    try {
      const nutritionId = req.params.nutritionId
      const userNutrition = req.user.lists.nutrition
      const nutritionIndex = userNutrition.findIndex(nutrition => nutrition._id === nutritionId)
      await Nutrition.findByIdAndDelete(nutritionId)
      userNutrition.splice(nutritionIndex, 1)
      await req.user.save()
      res.redirect('/nutrition')

    }  catch (error) {
      res.render('error')
    }
  }


  //displays the nutrition page while passing the variables and the user signed in 
  async function displayNutritionPage(req, res) {
    try {
      const nutritions = await Nutrition.find()
      const currentUser = req.user
      res.render('nutrition', { nutritions, currentUser })

    }  catch (error) {
      res.render('error')
    }
  }

  //displays the nutrition form with its id in the input value 
  async function displayEditNutritionForm(req,res){
    try {
      const nutritionId = req.params.nutritionId
      const nutrition = await Nutrition.findById(nutritionId)
      res.render('editnutritionform', {nutrition, nutritionId})

    }  catch (error) {
      res.render('error')
    }
  }

  //displays the post form for a single nutrition 
function displayNutritionForm(req, res){
  res.render('nutritionform')
}


module.exports = {postNutrition, deleteNutrition, displayNutritionPage, displayNutritionForm, displayEditNutritionForm, updateNutrition}