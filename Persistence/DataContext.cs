using Domain.Recipes;
using Microsoft.EntityFrameworkCore;

namespace Persistence {

    public class DataContext : DbContext {

        public DataContext(DbContextOptions options) : base(options) {

        }

        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<RecipeIngredient> RecipeIngredients { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<Instruction> Instructions { get; set; }
    }
}