using Application.Recipes;
using AutoMapper;
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
            .ForMember(d => d.Bio, o => o.MapFrom(s => s.Bio));
        }
    }
}