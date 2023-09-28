using Domain.Recipes;
using Domain.User;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence {

    public class DataContext : IdentityDbContext<AppUser> {

        public DataContext(DbContextOptions options) : base(options) {

        }

        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<RecipeIngredient> RecipeIngredients { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<Instruction> Instructions { get; set; }
    }
}