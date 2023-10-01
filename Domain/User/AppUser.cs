using Domain.Recipes;
using Microsoft.AspNetCore.Identity;

namespace Domain.User {

    public class AppUser : IdentityUser {

        public string DisplayName { get; set; }
        public string Bio { get; set; }

        public ICollection<Recipe> Recipes { get; set; }
        public ICollection<Photo> Photos { get; set; }

        public AppUser() {
            Recipes = new List<Recipe>();
            Photos = new List<Photo>();
        }
    }
}