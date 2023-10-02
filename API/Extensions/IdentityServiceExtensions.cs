using System.Text;
using API.Services;
using Domain.User;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions {

    public static class IdentityServiceExtensions {

        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config) {
            services.AddIdentityCore<AppUser>(opt => {
                opt.Password.RequireNonAlphanumeric = false;
                opt.User.RequireUniqueEmail = true;
            })
            .AddEntityFrameworkStores<DataContext>();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt => {
                    opt.TokenValidationParameters = new TokenValidationParameters {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                    opt.Events = new JwtBearerEvents {
                        OnMessageReceived = context => {
                            var accessToken = context.Request.Query["access_token"];
                            var path = context.HttpContext.Request.Path;
                            if (!string.IsNullOrEmpty(accessToken) && (path.StartsWithSegments("/chat"))) {
                                context.Token = accessToken;
                            }
                            return Task.CompletedTask;
                        }
                    };
                });
            services.AddAuthorization(opt => {
                opt.AddPolicy("IsRecipeAuthor", policy => {
                    policy.Requirements.Add(new IsAuthorRequirement());
                });
            });
            services.AddTransient<IAuthorizationHandler, IsAuthorRequirementHandler>();
            services.AddScoped<TokenService>();
            return services;
        }
    }
}