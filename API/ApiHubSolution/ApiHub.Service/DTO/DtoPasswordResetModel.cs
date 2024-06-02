using ApiHub.Service.Attributes;
using System.Text.Json.Serialization;

namespace ApiHub.Service.DTO
{
    public class DtoPasswordResetModel
    {
        [Parameter]
        public string? Token { get; set; }
        [Parameter]
        public string? NewPassword { get; set; }
        public string? ConfirmPassword { get; set; }
    }


    public class DtoPasswordResetRequestModel
    {
        [Parameter]
        public string? EmailId { get; set; }      
    }

    public class DtoChangepassword
    {
        [JsonIgnore]
        [Parameter]
        public string? UserId { get; set; }
        public string? OldPassword { get; set; }

        [Parameter]
        public string? NewPassword { get; set;}
        public string? ConfirmPassword { get; set; }
    }
}
