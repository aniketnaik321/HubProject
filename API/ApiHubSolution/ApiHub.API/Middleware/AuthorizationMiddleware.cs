using Microsoft.AspNetCore.Authorization.Policy;
using Microsoft.AspNetCore.Authorization;
using System.Net;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace ApiHub.API.Middleware
{


    public class DefaultAuthorizationMiddlewareResultHandler : IAuthorizationMiddlewareResultHandler
    {
        private readonly AuthorizationMiddlewareResultHandler defaultHandler = new();

        public async Task HandleAsync(
            RequestDelegate next,
            HttpContext context,
            AuthorizationPolicy policy,
            PolicyAuthorizationResult authorizeResult
            )
        {
            string? authHeader = context.Request.Headers["Authorization"];
            if (authHeader != null && authHeader.StartsWith("Bearer"))
            {
                string token = authHeader.Substring("Bearer ".Length).Trim();

                try
                {
                    // Validate the token
                    var claimsPrincipal = ValidateToken(token);
                    context.User = claimsPrincipal;
                }
                catch
                {
                    // Return unauthorized status code if the token is invalid
                    context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                    string message = "User is not permitted to access this resource";
                    await context.Response.WriteAsync(message, Encoding.UTF8);
                    return;
                }
            }
            else
            {
                // Return unauthorized status code if the token is invalid
                context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                string message = "Bearer token is not passed or Token is invalid.";
                await context.Response.WriteAsync(message, Encoding.UTF8);
                return;

            }
            await next(context);
        }

        private ClaimsPrincipal ValidateToken(string token)
        {
            var key = Encoding.ASCII.GetBytes("2B7E151628AED2A6ABF7158809CF4F3C");
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateLifetime = false
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid Token");
            return principal;

        }
    }

    public class Show404Requirement : IAuthorizationRequirement { }

}
