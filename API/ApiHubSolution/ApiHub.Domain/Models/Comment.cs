using System;
using System.Collections.Generic;

namespace ApiHub.Domain.Models;

public partial class Comment
{
    public int Id { get; set; }

    public string UserComment { get; set; } = null!;

    public int? ParentCommentId { get; set; }

    public DateTime? EntryDate { get; set; }

    public Guid? UserId { get; set; }

    public int? IssueId { get; set; }

    public bool IsDeleted { get; set; }

    public DateTime? DeletedOn { get; set; }

    public Guid? DeletedBy { get; set; }

    public virtual ICollection<Comment> InverseParentComment { get; set; } = new List<Comment>();

    public virtual Issue? Issue { get; set; }

    public virtual Comment? ParentComment { get; set; }

    public virtual User? User { get; set; }
}
