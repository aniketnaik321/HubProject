
using ApiHub.Domain.Models;
using ApiHub.Service.Attributes;
using System.Text.Json.Serialization;

namespace ApiHub.Service.DTO
{
    public partial class DtoPostCommentRequest
    {
        [Parameter]
        public int KeyId { get; set; }

        [Parameter]
        public int PageNumber { get; set; }

        [Parameter]
        public int PageSize { get; set; }
    }
}
