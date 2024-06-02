

namespace ApiHub.Service.DTO
{
    public partial class DtoCommentPostRequest
    {        
        public string UserComment { get; set; } = null!;

        public int? ParentCommentId { get; set; }

       public DateTime? EntryDate { get; set; }

       public Guid? UserId { get; set; }

       public int? IssueId { get; set; }
       
    }
}
