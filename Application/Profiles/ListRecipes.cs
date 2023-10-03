using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles {

    public class ListRecipes {
        public class Query : IRequest<Result<List<UserRecipeDTO>>> {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<UserRecipeDTO>>> {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper) {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<UserRecipeDTO>>> Handle(Query request, CancellationToken cancellationToken) {


                var query = _context.Recipes
                    .Where(u => u.Author.UserName == request.Username)
                    .OrderBy(a => a.Date)
                    .ProjectTo<UserRecipeDTO>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                var today = DateTime.UtcNow;

                query = request.Predicate switch {
                    "dinner" => query.Where(a => a.Category == "Dinner"),
                    "lunch" => query.Where(a => a.Category == "Lunch"),
                    "breakfast" => query.Where(a => a.Category == "Breakfast"),
                    "Dinner" => query.Where(a => a.Category == "Dinner"),
                    "Lunch" => query.Where(a => a.Category == "Lunch"),
                    "Breakfast" => query.Where(a => a.Category == "Breakfast"),
                    _ => query.Where(a => a.Date >= today)
                };

                var recipes = await query.ToListAsync();

                return Result<List<UserRecipeDTO>>.Success(recipes);
            }
        }
    }
}