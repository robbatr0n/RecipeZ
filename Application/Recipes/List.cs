using Application.Core;
using Domain.Recipes;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Recipes {

    public class List {

        public class Query : IRequest<Result<List<Recipe>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Recipe>>> {

            private readonly DataContext _context;

            public Handler(DataContext context) {
                _context = context;
            }

            public async Task<Result<List<Recipe>>> Handle(Query request, CancellationToken cancellationToken) {
                return Result<List<Recipe>>.Success(await _context.Recipes.ToListAsync());
            }
        }
    }
}