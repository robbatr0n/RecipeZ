using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Recipes {

    public class List {

        public class Query : IRequest<Result<PagedList<RecipeDTO>>> {
            public RecipeParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<RecipeDTO>>> {

            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor) {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<PagedList<RecipeDTO>>> Handle(Query request, CancellationToken cancellationToken) {
                var query = _context.Recipes

                .OrderBy(d => d.Date)
                .Include(r => r.RecipeIngredients).ThenInclude(ri => ri.Ingredient)
                .ProjectTo<RecipeDTO>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername() })
                .AsQueryable();

                var x = request.Params;

                if (request.Params.IsAuthor) {
                    query = query.Where(x => x.Author.Username == _userAccessor.GetUsername());
                }
                if (request.Params.IsBreakfast) {
                    query = query.Where(x => x.Category == "Breakfast");
                }
                if (request.Params.IsLunch) {
                    query = query.Where(x => x.Category == "Lunch");
                }

                if (request.Params.IsDinner) {
                    query = query.Where(x => x.Category == "Dinner");
                }

                return Result<PagedList<RecipeDTO>>.Success(
                    await PagedList<RecipeDTO>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}