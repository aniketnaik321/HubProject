using ApiHub.Service.Attributes;
using System.Text.Json.Serialization;

namespace ApiHub.Service.DTO
{
    public class DtoUser
    {
        public Guid? Id { get; set; }

        [Parameter]
        public string? UserName { get; set; }
        [Parameter("PasswordHash")]
        public string? Password{ get; set; }

        [Parameter]
        public string? FullName { get; set; }

        public string? RefreshToken { get; set; }

        public string? Token { get; set; }

        public bool? IsActive { get; set; }

        [Parameter]
        public string? EmailId { get; set; }

        public DtoRoles[] Roles { get; set;}

        public virtual ICollection<UserProfile> UserProfiles { get; set; } = new List<UserProfile>();

    }


    public class DtoRegisterUserModel
    {
        public Guid? Id { get; set; }

        [Parameter]
        public string? EmailId { get; set; }        

        [Parameter]
        [JsonIgnore]
        public string? UserName { get; set; }

        [Parameter("PasswordHash")]
        public string? Password { get; set; }

        [Parameter("PasswordPlainText")]
        [JsonIgnore]
        public string? PasswordPlainText { get; set; }

        [Parameter]
        public string? FullName { get; set; }
        public DtoRoles[] Roles { get; set; }

        [Parameter]
        public string UserRoles
        {
            get
            {
                // Convert Roles array to a comma-separated string of RoleIds
                return Roles != null && Roles.Length > 0
                    ? string.Join(",", Roles.Select(r => r.Id.ToString()))
                    : string.Empty;  // Return an empty string if Roles is null or empty
            }
            // Optional: You can keep the set accessor if needed for other operations
            set
            {
                UserRoles = value;
            }
        }
    }

}
