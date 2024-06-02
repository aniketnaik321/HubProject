using System;
using System.Collections.Generic;

namespace ApiHub.Domain.Models;

public partial class WorkLog
{
    public int? Id { get; set; }

    public DateTime EntryDate { get; set; }

    public string? ConsolidatedTask { get; set; }

    public Guid? UserId { get; set; }

    public DateTime? CreatedOn { get; set; }

    public Guid? CreatedBy { get; set; }

    public int? IssueId { get; set; }

    public virtual Issue? Issue { get; set; }
}
