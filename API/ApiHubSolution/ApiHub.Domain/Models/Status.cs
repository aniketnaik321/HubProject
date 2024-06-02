using System;
using System.Collections.Generic;

namespace ApiHub.Domain.Models;

public partial class Status
{
    public int Id { get; set; }

    public string StatusName { get; set; } = null!;

    public int? SequenceNo { get; set; }

    public virtual ICollection<Issue> Issues { get; set; } = new List<Issue>();
}
