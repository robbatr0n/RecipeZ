using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Recipes;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Recipes {

    public class List {

        public class Query : IRequest<Result<List<RecipeDTO>>> { }

        public class Handler : IRequestHandler<Query, Result<List<RecipeDTO>>> {

            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper) {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<RecipeDTO>>> Handle(Query request, CancellationToken cancellationToken) {
                var recipes = await _context.Recipes
                // .Include(a => a.Author)
                // .Include(a => a.Instructions)
                // .Include(a => a.RecipeIngredients)
                 .Include(r => r.RecipeIngredients).ThenInclude(ri => ri.Ingredient)
                .ProjectTo<RecipeDTO>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

                // var recipesToReturn = _mapper.Map<List<RecipeDTO>>(recipes);

                return Result<List<RecipeDTO>>.Success(recipes);
            }
        }
    }
}