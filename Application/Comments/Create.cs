using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments {

    public class Create {

        public class Command : IRequest<Result<CommentDTO>> {
            public string Body { get; set; }
            public Guid RecipeId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command> {
            public CommandValidator() {
                RuleFor(x => x.Body).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<CommentDTO>> {

            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor) {
                _userAccessor = userAccessor;
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<CommentDTO>> Handle(Command request, CancellationToken cancellationToken) {
                var recipe = await _context.Recipes
                    .Include(x => x.Comments)
                    .ThenInclude(x => x.Author)
                    .ThenInclude(x => x.Photos)
                    .FirstOrDefaultAsync(x => x.Id == request.RecipeId);

                if (recipe == null) return null;

                var user = await _context.Users
                    .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                var comment = new Comment {
                    Author = user,
                    Recipe = recipe,
                    Body = request.Body
                };

                recipe.Comments.Add(comment);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<CommentDTO>.Success(_mapper.Map<CommentDTO>(comment));

                return Result<CommentDTO>.Failure("Failed to add comment");
            }
        }
    }
}