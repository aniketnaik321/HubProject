using System;
using System.Collections.Generic;

namespace ApiHub.Domain.Models;

public partial class JobPosition
{
    public int Id { get; set; }

    public string? JobTile { get; set; }

    public string? JobDescription { get; set; }

    public string? SalaryBand { get; set; }

    public virtual ICollection<EmployeeDetail> EmployeeDetails { get; set; } = new List<EmployeeDetail>();
}
