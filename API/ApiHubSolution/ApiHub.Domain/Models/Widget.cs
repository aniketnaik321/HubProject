using System;
using System.Collections.Generic;

namespace ApiHub.Domain.Models;

public partial class Widget
{
    public long WidgetId { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public string? WidgetImageData { get; set; }

    public DateTime? CreatedOn { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? ModifiedOn { get; set; }

    public int? ModifiedBy { get; set; }

    public bool IsRemoved { get; set; }

    public int? RemovedBy { get; set; }

    public DateTime? RemovedOn { get; set; }
}
