using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security {

    public class IsAuthorRequirement : IAuthorizationRequirement {

    }

    public class IsAuthorRequirementHandler : AuthorizationHandler<IsAuthorRequirement> {

        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public IsAuthorRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor) {
            _httpContextAccessor = httpContextAccessor;
            _dbContext = dbContext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsAuthorRequirement requirement) {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Task.CompletedTask;
            var recipeId = Guid.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues.SingleOrDefault(x => x.Key == "id").Value?.ToString());
            var recipe = _dbContext.Recipes.AsNoTracking().SingleOrDefaultAsync(x => x.Id == recipeId).Result;

            if (recipe.AuthorId != userId) {
                return Task.CompletedTask;
            } else {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}