using Application.Profiles;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers {

    public class ProfilesController : BaseApiController {

        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username) {
            return HandleResult(await Mediator.Send(new Details.Query { Username = username }));
        }

        [HttpGet("{username}/recipes")]
        public async Task<IActionResult> GetUserRecipes(string username, string predicate) {
            return HandleResult(await Mediator.Send(new ListRecipes.Query { Username = username, Predicate = predicate }));
        }
    }
}