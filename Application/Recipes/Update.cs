using AutoMapper;
using MediatR;
using Persistence;
using FluentValidation;
using Application.Core;
using Domain.Recipes;

namespace Application.Recipes {

    public class Update {

        public class Command : IRequest<Result<Unit>> {
            public Recipe Recipe { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command> {

            public CommandValidator() {
                RuleFor(x => x.Recipe).SetValidator(new RecipeValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>> {

            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper) {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken) {
                var activity = await _context.Recipes.FindAsync(request.Recipe.Id);

                if (activity == null) return null;

                _mapper.Map(request.Recipe, activity);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update activity");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}