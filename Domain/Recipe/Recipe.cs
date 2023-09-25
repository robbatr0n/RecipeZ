namespace Domain.Recipes {

    public class Recipe {

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }

        public virtual List<RecipeIngredient> RecipeIngredients { get; set; }
        public virtual List<Instruction> Instructions { get; set; }

        public Recipe() {
            RecipeIngredients = new List<RecipeIngredient>();
            Instructions = new List<Instruction>();
        }
    }
}