using System;
using System.Collections.Generic;

namespace ApiHub.Domain.Models;

public partial class EmployeePayroll
{
    public int Id { get; set; }

    public Guid? EmployeeId { get; set; }

    public decimal? GrossSalary { get; set; }

    public decimal? NetSalary { get; set; }

    public int? PayMonth { get; set; }

    public int? PayYear { get; set; }

    public DateTime? CreatedOn { get; set; }

    public virtual EmployeeDetail? Employee { get; set; }

    public virtual ICollection<EmployeePayrollDetail> EmployeePayrollDetails { get; set; } = new List<EmployeePayrollDetail>();
}
