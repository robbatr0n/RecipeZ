using Application.Comments;
using Application.Recipes;
using AutoMapper;
using Domain;
using Domain.Recipes;
using Domain.User;

namespace Application.Core {

    public class MappingProfiles : Profile {

        public MappingProfiles() {

            CreateMap<Recipe, Recipe>();

            CreateMap<Recipe, RecipeDTO>()
            .ForMember(d => d.Author, o => o.MapFrom(s => s.Author))
            .ForMember(d => d.AuthorId, o => o.MapFrom(s => s.Author.Id));

            CreateMap<RecipeDTO, Profiles.Profile>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.Username))
            .ForMember(d => d.Bio, o => o.MapFrom(s => s.Author.Bio));

            CreateMap<AppUser, Profiles.Profile>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.DisplayName))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.UserName))
            .ForMember(d => d.Bio, o => o.MapFrom(s => s.Bio))
            .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url));

            CreateMap<Comment, CommentDTO>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
            .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName))
            .ForMember(d => d.Image, o => o.MapFrom(s => s.Author.Photos.FirstOrDefault(x => x.IsMain).Url));

            CreateMap<Recipe, Profiles.UserRecipeDTO>()
            .ForMember(d => d.Id, o => o.MapFrom(s => s.Id))
            .ForMember(d => d.Title, o => o.MapFrom(s => s.Name))
            .ForMember(d => d.Category, o => o.MapFrom(s => s.Category))
            .ForMember(d => d.Cuisine, o => o.MapFrom(s => s.Cuisine))
            .ForMember(d => d.Image, o => o.MapFrom(s => s.Image))
            .ForMember(d => d.Date, o => o.MapFrom(s => s.Date));
        }
    }
}