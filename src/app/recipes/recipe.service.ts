import { Injectable, OnInit } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { HttpClient } from '@angular/common/http';
import { map, Subscription } from 'rxjs';

@Injectable()
export class RecipeService implements OnInit{
  public recipes: Recipe[] = [
    // new Recipe(
    //   'Tasty Schnitzel',
    //   'A super-tasty Schnitzel - just awesome!',
    //   'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
    //   [
    //     new Ingredient('Meat', 1),
    //     new Ingredient('French Fries', 20)
    //   ]),
    // new Recipe('Big Fat Burger',
    //   'What else you need to say?',
    //   'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
    //   [
    //     new Ingredient('Buns', 2),
    //     new Ingredient('Meat', 1)
    //   ])
  ];
  ngOnInit(){
    this.fetchRecipes();
  }
  constructor(private slService: ShoppingListService,
    private http: HttpClient) {
    }

  getRecipes() {
    //fetch from the database
    this.fetchRecipes();
    return this.recipes;
  }

  getRecipe(index: number) {
    console.log(this.recipes);
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
  //add a new recipe to the database
  addNewRecipe(recipe: {name: string, description: string, imagePath: string, 
    ingredients: {firstIngredient: string, firstIngredientAmount: number, secondIngredient: string, secondIngredientAmount: number}}){
    this.http.post('https://http-client-practice-8b08d-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipe)
    .subscribe(recipe=>console.log(recipe));
  }

  fetchRecipes(){
    this.http.get('https://http-client-practice-8b08d-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
    .pipe(map(response=>{
      console.log(response);
      for(const key in response){
        if(response.hasOwnProperty(key))
        {
          this.recipes.push({...response[key], id:key})
          console.log({...response[key], id:key});
        }
      }
      return this.recipes;
    }))
    .subscribe(fetchedRecipes=>console.log('Successfully fetched'));
  }
}
