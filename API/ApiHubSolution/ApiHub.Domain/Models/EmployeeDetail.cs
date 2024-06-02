using System;
using System.Collections.Generic;

namespace ApiHub.Domain.Models;

public partial class EmployeeDetail
{
    public Guid Id { get; set; }

    public Guid? UserId { get; set; }

    public string FullName { get; set; } = null!;

    public string? CurrentAddress { get; set; }

    public string? PermanentAddress { get; set; }

    public string? PhotoUrl { get; set; }

    public Guid? ManagerId { get; set; }

    public DateTime? HireDate { get; set; }

    public int? EmploymentStatus { get; set; }

    public int? DepartmentId { get; set; }

    public int? JobPositionId { get; set; }

    public virtual ICollection<Attendance> Attendances { get; set; } = new List<Attendance>();

    public virtual Department? Department { get; set; }

    public virtual ICollection<EmployeePayroll> EmployeePayrolls { get; set; } = new List<EmployeePayroll>();

    public virtual JobPosition? JobPosition { get; set; }
}
