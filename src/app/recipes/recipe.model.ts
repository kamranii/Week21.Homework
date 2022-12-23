import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  public id: string;
  public name: string;
  public description: string;
  public path: string;
  public ingredients: Ingredient[];

  constructor(name: string, desc: string, imagePath: string, ingredients: Ingredient[]) {
    this.name = name;
    this.description = desc;
    this.path = imagePath;
    this.ingredients = ingredients;
  }
}
