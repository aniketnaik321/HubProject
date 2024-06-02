
using ApiHub.Domain.Models;
using ApiHub.Service.Attributes;
using System.Text.Json.Serialization;

namespace ApiHub.Service.DTO
{
    public partial class DtoUpdateUserStatus
    {
        [Parameter]
        public bool Status{ get; set; }
        [Parameter]
        public Guid UserId { get; set; }
    }
}
