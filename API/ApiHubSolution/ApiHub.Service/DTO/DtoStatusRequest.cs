
using ApiHub.Domain.Models;
using ApiHub.Service.Attributes;
using System.Text.Json.Serialization;

namespace ApiHub.Service.DTO
{
    public partial class DtoStatusUpdateRequest
    {

        [Parameter]
        public int StatusId { get; set; }

        [Parameter]
        public int IssueId { get; set; }

        [Parameter]
        public Guid? UserId { get; set; }

       
        [JsonIgnore]
        public Guid? ActionUserId { get; set; }

        [Parameter]
        public string? UserComment { get; set; }

        [JsonIgnore]
        public string? DeviceToken { get; set; }

    }


}
