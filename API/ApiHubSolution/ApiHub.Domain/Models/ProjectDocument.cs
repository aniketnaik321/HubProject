using System;
using System.Collections.Generic;

namespace ApiHub.Domain.Models;

public partial class ProjectDocument
{
    public int Id { get; set; }

    public string? DocumentTitle { get; set; }

    public string? Description { get; set; }

    public string? DocumentUrl { get; set; }

    public Guid? ProjectId { get; set; }

    public DateTime? CreatedOn { get; set; }

    public Guid? CreatedBy { get; set; }

    public virtual Project? Project { get; set; }
}
