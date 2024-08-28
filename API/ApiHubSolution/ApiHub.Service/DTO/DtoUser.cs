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
    }

}
