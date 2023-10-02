using Application.Core;
using Application.Interfaces;
using Domain.Recipes;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Recipes {

    public class Create {

        public class Command : IRequest<Result<Unit>> {
            public Recipe Recipe { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>> {

            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor) {
                _userAccessor = userAccessor;
                _context = context;
            }

            public class CommandValidator : AbstractValidator<Command> {

                public CommandValidator() {
                    RuleFor(x => x.Recipe).SetValidator(new RecipeValidator());
                }
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken) {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                request.Recipe.Author = user;
                request.Recipe.AuthorId = user.Id;
                user.Recipes.Add(request.Recipe);

                _context.Recipes.Add(request.Recipe);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create recipe");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}