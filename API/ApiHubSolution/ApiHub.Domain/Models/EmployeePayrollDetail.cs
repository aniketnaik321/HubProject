using System;
using System.Collections.Generic;

namespace ApiHub.Domain.Models;

public partial class EmployeePayrollDetail
{
    public int Id { get; set; }

    public int? PayelementId { get; set; }

    public decimal? Amount { get; set; }

    public int? EmployeePayrollId { get; set; }

    public virtual EmployeePayroll? EmployeePayroll { get; set; }

    public virtual Payelement? Payelement { get; set; }
}
