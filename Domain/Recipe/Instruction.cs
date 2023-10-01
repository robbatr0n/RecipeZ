using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Recipes {

    public class Instruction {

        public Guid Id { get; set; }
        [Column(Order = 0)]
        public int Step { get; set; }
        public string Text { get; set; }

        public Guid RecipeId { get; set; }
        public Recipe Recipe { get; set; }
    }
}