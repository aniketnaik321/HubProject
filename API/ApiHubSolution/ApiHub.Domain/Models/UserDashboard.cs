using System;
using System.Collections.Generic;

namespace ApiHub.Domain.Models;

public partial class UserDashboard
{
    public long UserDashboardId { get; set; }

    public int? WidgetId { get; set; }

    public string? WidgetConfiguration { get; set; }

    public int? DisplayOrder { get; set; }

    public string? DatasetQuery { get; set; }

    public DateTime? CreatedOn { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? ModifiedOn { get; set; }

    public int? ModifiedBy { get; set; }

    public bool IsRemoved { get; set; }

    public int? RemovedBy { get; set; }

    public DateTime? RemovedOn { get; set; }
}
