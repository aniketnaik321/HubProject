using System;
using System.Collections.Generic;

namespace ApiHub.Domain.Models;

public partial class Department
{
    public int Id { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<EmployeeDetail> EmployeeDetails { get; set; } = new List<EmployeeDetail>();
}
