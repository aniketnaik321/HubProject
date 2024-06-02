using System;
using System.Collections.Generic;

namespace ApiHub.Domain.Models;

public partial class IssueDocument
{
    public int Id { get; set; }

    public string? DocumentTitle { get; set; }

    public string? Description { get; set; }

    public string? DocumentUrl { get; set; }

    public int? IssueId { get; set; }

    public DateTime? CreatedOn { get; set; }

    public Guid? CreatedBy { get; set; }

    public virtual Issue? Issue { get; set; }
}
