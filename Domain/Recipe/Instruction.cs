namespace Domain.Recipes {

    public class Instruction {

        public Guid Id { get; set; }
        public int Step { get; set; }
        public string Text { get; set; }

        public Guid RecipeId { get; set; }
        public Recipe Recipe { get; set; }
    }
}