using System.Text.Json.Serialization;

namespace Domain.Recipes {

    public class RecipeIngredient {

        public Guid Id { get; set; }
        public string Unit { get; set; }
        public double Amount { get; set; }

        public Guid RecipeId { get; set; }

        public Recipe Recipe { get; set; }
        public Guid IngredientId { get; set; }

        public Ingredient Ingredient { get; set; }
    }
}