export class Ingredient {
  public ingredientName: string;
  public ingredientAmount: number;
  constructor(public name: string, public amount: number) {
   this.ingredientName = name;
   this.ingredientAmount = amount; 
  }
}
