using System.Text.Json.Serialization;
using Application.Profiles;
using Domain.Recipes;

namespace Application.Recipes {

    public class RecipeDTO {

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public string Cuisine { get; set; }
        public string CookTime { get; set; }

        public string AuthorId { get; set; }
        public Profile Author { get; set; }

        public List<RecipeIngredient> RecipeIngredients { get; set; }
        public List<Instruction> Instructions { get; set; }
    }
}