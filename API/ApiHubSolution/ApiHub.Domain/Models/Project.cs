using System;
using System.Collections.Generic;

namespace ApiHub.Domain.Models;

public partial class Project
{
    public Guid Id { get; set; }

    public string ProjectName { get; set; } = null!;

    public string? ProjectTaskPrefix { get; set; }

    public string? Description { get; set; }

    public DateTime? CreatedOn { get; set; }

    public Guid? CreatedBy { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public int CompletionState { get; set; }

    public bool IsDeleted { get; set; }

    public DateTime? DeletedOn { get; set; }

    public Guid? DeletedBy { get; set; }

    public virtual ICollection<Issue> Issues { get; set; } = new List<Issue>();

    public virtual ICollection<ProjectDocument> ProjectDocuments { get; set; } = new List<ProjectDocument>();
}
