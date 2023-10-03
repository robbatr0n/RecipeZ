using System;
using Application.Core;

namespace Application.Recipes {
    public class RecipeParams : PagingParams {
        public bool IsAuthor { get; set; }
        public bool IsBreakfast { get; set; }
        public bool IsLunch { get; set; }
        public bool IsDinner { get; set; }
        public DateTime StartDate { get; set; } = DateTime.UtcNow;
    }
}