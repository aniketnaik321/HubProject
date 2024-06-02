using System;
using System.Collections.Generic;

namespace ApiHub.Domain.Models;

public partial class Location
{
    public long LocationId { get; set; }

    public string? LocationTitle { get; set; }

    public string? LocationDetail { get; set; }

    public DateTime? CreatedOn { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? ModifiedOn { get; set; }

    public int? ModifiedBy { get; set; }

    public bool IsRemoved { get; set; }

    public int? RemovedBy { get; set; }

    public DateTime? RemovedOn { get; set; }
}
