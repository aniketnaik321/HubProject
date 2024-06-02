using System;
using System.Collections.Generic;

namespace ApiHub.Domain.Models;

public partial class Payelement
{
    public int Id { get; set; }

    public string? Title { get; set; }

    public bool? IsDeduction { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<EmployeePayrollDetail> EmployeePayrollDetails { get; set; } = new List<EmployeePayrollDetail>();
}
