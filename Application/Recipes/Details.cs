using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Recipes;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Recipes {

    public class Details {

        public class Query : IRequest<Result<RecipeDTO>> {
            public Guid RecipeId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<RecipeDTO>> {

            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper) {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<RecipeDTO>> Handle(Query request, CancellationToken cancellationToken) {
                var recipe = await _context.Recipes
                   .ProjectTo<RecipeDTO>(_mapper.ConfigurationProvider)
                   .FirstOrDefaultAsync(x => x.Id == request.RecipeId);
                return Result<RecipeDTO>.Success(recipe);
            }
        }
    }
}