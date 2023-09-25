using Application.Core;
using Domain.Recipes;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Recipes {

    public class Create {

        public class Command : IRequest<Result<Unit>> {
            public Recipe Recipe { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>> {

            private readonly DataContext _context;

            public Handler(DataContext context) {
                _context = context;
            }

            public class CommandValidator : AbstractValidator<Command> {

                public CommandValidator() {
                    RuleFor(x => x.Recipe).SetValidator(new RecipeValidator());
                }
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken) {
                _context.Recipes.Add(request.Recipe);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create activity");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}