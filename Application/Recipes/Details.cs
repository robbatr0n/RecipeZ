using Application.Core;
using Domain.Recipes;
using MediatR;
using Persistence;

namespace Application.Recipes {

    public class Details {

        public class Query : IRequest<Result<Recipe>> {
            public Guid RecipeId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Recipe>> {

            private readonly DataContext _context;

            public Handler(DataContext context) {
                _context = context;
            }

            public async Task<Result<Recipe>> Handle(Query request, CancellationToken cancellationToken) {
                var recipe = await _context.Recipes.FindAsync(request.RecipeId);
                return Result<Recipe>.Success(recipe);
            }
        }
    }
}