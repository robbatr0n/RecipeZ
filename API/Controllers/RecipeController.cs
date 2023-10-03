using Application.Core;
using Application.Recipes;
using Domain.Recipes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers {


    public class RecipesController : BaseApiController {

        [HttpGet]
        public async Task<IActionResult> GetRecipes([FromQuery] RecipeParams _params) {
            return HandlePagedResult(await Mediator.Send(new List.Query { Params = _params }));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRecipe(Guid id) {
            return HandleResult(await Mediator.Send(new Details.Query { RecipeId = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateRecipe(Recipe recipe) {
            return HandleResult(await Mediator.Send(new Create.Command { Recipe = recipe }));
        }

        [Authorize(Policy = "IsRecipeAuthor")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRecipe(Guid id, Recipe recipe) {
            recipe.Id = id;
            return HandleResult(await Mediator.Send(new Update.Command { Recipe = recipe }));
        }

        [Authorize(Policy = "IsRecipeAuthor")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecipe(Guid id) {
            return HandleResult(await Mediator.Send(new Delete.Command { ReceipeId = id }));
        }
    }
}