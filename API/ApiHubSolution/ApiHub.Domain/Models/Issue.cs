using System;
using System.Collections.Generic;

namespace ApiHub.Domain.Models;

public partial class Issue
{
    public int Id { get; set; }

    public Guid ProjectId { get; set; }

    public string IssueKey { get; set; } = null!;

    public string Summary { get; set; } = null!;

    public string? Description { get; set; }

    public int? IssueType { get; set; }

    public int? PriorityId { get; set; }

    public int? StatusId { get; set; }

    public int? EstimatedTime { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? DueDate { get; set; }

    public Guid? AssigneeUserId { get; set; }

    public Guid? ReporterUserId { get; set; }

    public bool IsDeleted { get; set; }

    public DateTime? DeletedOn { get; set; }

    public Guid? DeletedBy { get; set; }

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual ICollection<IssueDocument> IssueDocuments { get; set; } = new List<IssueDocument>();

    public virtual Priority? Priority { get; set; }

    public virtual Project Project { get; set; } = null!;

    public virtual Status? Status { get; set; }
}
