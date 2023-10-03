using Domain.Recipes;
using Domain.User;
using Microsoft.AspNetCore.Identity;

namespace Persistence {

    public class Seed {

        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager) {

            if (context.Recipes.Any()) return;
            if (context.RecipeIngredients.Any()) return;
            if (context.Ingredients.Any()) return;
            if (context.Instructions.Any()) return;

            if (!userManager.Users.Any()) {



                var users = new List<AppUser> {
                    new AppUser {
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    },
                    new AppUser {
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com"
                    },
                    new AppUser {
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                };

                foreach (var user in users) {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }


                var goulashRecipe = new Recipe {
                    Name = "Hungarian Goulash",
                    Description = "Only for when you are really really Hungary. This is a delicious and cheap recipe. It's mostly just a fancy beef stew. But you can make yourself sound really fancy when you tell your friends and family that you are making Hungarian Goulash!",
                    Date = DateTime.UtcNow.AddMonths(-1),
                    Category = "Dinner",
                    Author = users.First(),
                    AuthorId = users.First().Id,
                    Image = "https://hips.hearstapps.com/del.h-cdn.co/assets/17/37/2048x1024/landscape-1505333248-goulash-delish-1.jpg?resize=1200:*"
                };

                var ingredients = new Ingredient[] {
                new Ingredient { Name = "Onion" },
                new Ingredient { Name = "Butter" },
                new Ingredient { Name = "Caraway Seeds" },
                new Ingredient { Name = "Paprika" },
                new Ingredient { Name = "Flour" },
                new Ingredient { Name = "Stewing Beef - Cubed" },
                new Ingredient { Name = "Beef Broth" },
                new Ingredient { Name = "Tomatoes - Diced" },
                new Ingredient { Name = "Potatoes" },
                new Ingredient { Name = "Carrots" },
                new Ingredient { Name = "Salt" },
                new Ingredient { Name = "Pepper" },
           };

                var recipeIngredients = new List<RecipeIngredient>();
                recipeIngredients.Add(new RecipeIngredient { Recipe = goulashRecipe, Ingredient = ingredients[0], Amount = 2, Unit = "Medium" });
                recipeIngredients.Add(new RecipeIngredient { Recipe = goulashRecipe, Ingredient = ingredients[1], Amount = 2, Unit = "Teaspoons" });
                recipeIngredients.Add(new RecipeIngredient { Recipe = goulashRecipe, Ingredient = ingredients[2], Amount = 1, Unit = "Teaspoon" });
                recipeIngredients.Add(new RecipeIngredient { Recipe = goulashRecipe, Ingredient = ingredients[3], Amount = 2, Unit = "Tablespoon" });
                recipeIngredients.Add(new RecipeIngredient { Recipe = goulashRecipe, Ingredient = ingredients[4], Amount = 0.25, Unit = "Cup" });
                recipeIngredients.Add(new RecipeIngredient { Recipe = goulashRecipe, Ingredient = ingredients[5], Amount = 1.5, Unit = "Pounds" });
                recipeIngredients.Add(new RecipeIngredient { Recipe = goulashRecipe, Ingredient = ingredients[6], Amount = 2, Unit = "Cups" });
                recipeIngredients.Add(new RecipeIngredient { Recipe = goulashRecipe, Ingredient = ingredients[7], Amount = 1, Unit = "Cup" });
                recipeIngredients.Add(new RecipeIngredient { Recipe = goulashRecipe, Ingredient = ingredients[8], Amount = 3, Unit = "Cups" });
                recipeIngredients.Add(new RecipeIngredient { Recipe = goulashRecipe, Ingredient = ingredients[9], Amount = 1.5, Unit = "Cups" });
                recipeIngredients.Add(new RecipeIngredient { Recipe = goulashRecipe, Ingredient = ingredients[10], Amount = 1, Unit = "Teaspoon" });
                recipeIngredients.Add(new RecipeIngredient { Recipe = goulashRecipe, Ingredient = ingredients[11], Amount = 0.25, Unit = "Teaspoon" });

                goulashRecipe.RecipeIngredients = recipeIngredients;

                var instructions = new Instruction[] {
                new Instruction { Recipe = goulashRecipe, Step = 1, Text = "In a large pot, melt butter and add onion. Cook till translucent. Stir in caraway seeds and paprika and mix well." },
                new Instruction { Recipe = goulashRecipe, Step = 2, Text = "In a bowl, dredge the stew beef with flour. Add beef to the onion mixture and cook for about 2-3 minutes. " },
                new Instruction { Recipe = goulashRecipe, Step = 3, Text = "Slowly add about ¼ cup of the beef broth to lift the brown bits off the bottom of the pan. Then add remaining broth, diced tomatoes (potatoes and carrots if using), salt and pepper." },
                new Instruction { Recipe = goulashRecipe, Step = 4, Text = "Stir and bring to a boil, cover, then reduce to a simmer for about 1 ½ -2 hours or until tender." },
            };

                var recInstructions = new List<Instruction>(instructions);
                goulashRecipe.Instructions = recInstructions;

                goulashRecipe.Cuisine = "Hungarian";
                goulashRecipe.CookTime = "1hr 20m";

                await context.Recipes.AddRangeAsync(goulashRecipe);
                await context.SaveChangesAsync();
            }
        }
    }
}