using Domain.Recipes;
using FluentValidation;

namespace Application.Recipes {

    public class RecipeValidator : AbstractValidator<Recipe> {

        public RecipeValidator() {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.Category).NotEmpty();
            RuleFor(x => x.RecipeIngredients).NotEmpty();
            RuleFor(x => x.Instructions).NotEmpty();
            RuleFor(x => x.Cuisine).NotEmpty();
            RuleFor(x => x.CookTime).NotEmpty();
        }
    }
}