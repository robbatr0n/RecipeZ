using Domain;
using Domain.Recipes;
using Domain.User;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence {

    public class DataContext : IdentityDbContext<AppUser> {

        public DataContext(DbContextOptions options) : base(options) {

        }

        protected override void OnModelCreating(ModelBuilder builder) {
            base.OnModelCreating(builder);

            builder.Entity<AppUser>()
            .HasMany(e => e.Recipes)
            .WithOne(e => e.Author)
            .HasForeignKey(e => e.AuthorId)
            .IsRequired();

            builder.Entity<Comment>()
            .HasOne(r => r.Recipe)
            .WithMany(c => c.Comments)
            .OnDelete(DeleteBehavior.Cascade);
        }

        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<RecipeIngredient> RecipeIngredients { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<Instruction> Instructions { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Comment> Comments { get; set; }
    }
}