using Domain.User;

namespace Domain.Recipes {

    public class Recipe {

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public string Cuisine { get; set; }
        public string CookTime { get; set; }

        public string Image { get; set; }

        public string AuthorId { get; set; }
        public AppUser Author { get; set; }

        public List<RecipeIngredient> RecipeIngredients { get; set; }
        public List<Instruction> Instructions { get; set; }
        public ICollection<Comment> Comments { get; set; }

        public Recipe() {
            RecipeIngredients = new List<RecipeIngredient>();
            Instructions = new List<Instruction>();
            Comments = new List<Comment>();
        }
    }
}