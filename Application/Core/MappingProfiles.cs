using AutoMapper;
using Domain.Recipes;

namespace Application.Core {

    public class MappingProfiles : Profile {

        public MappingProfiles() {

            CreateMap<Recipe, Recipe>();
        }
    }
}