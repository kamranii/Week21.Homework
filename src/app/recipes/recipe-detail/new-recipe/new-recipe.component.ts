import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY } from 'rxjs';
import { ValidateURL } from 'src/app/shared/url-validator.validator';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit{
  recipeForm: FormGroup
  constructor(private recipeService: RecipeService){}

  ngOnInit(): void {
    this.initalizeForm();
  }
  initalizeForm(){
    this.recipeForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl('', [Validators.required, Validators.minLength(15)]),
      path: new FormControl('', [Validators.required, ValidateURL]),
      ingredients: new FormGroup({
        firstIngredientName: new FormControl('', Validators.required),
        firstIngredientAmount: new FormControl('', [Validators.min(1), Validators.required]),
        secondIngredientName: new FormControl('', Validators.required),
        secondIngredientAmount: new FormControl('', [Validators.min(1), Validators.required]),
      })
    });
  }
  onSubmitRecipe(form: FormGroup){
    //log to the console
    console.log('Successfully submitted');
    //add to the database
    this.recipeService.addNewRecipe(form.value);
    //restart the form
    this.initalizeForm();
  }
}
