using System;
using System.Collections.Generic;

namespace ApiHub.Domain.Models;

public partial class Attendance
{
    public int Id { get; set; }

    public DateTime? InTime { get; set; }

    public DateTime? OutTime { get; set; }

    public string? AttendanceLocation { get; set; }

    /// <summary>
    /// Work from Home, Office, Remote
    /// </summary>
    public int? AttendanceTypeId { get; set; }

    public Guid? EmployeeId { get; set; }

    public int? Platform { get; set; }

    public virtual AttendanceType? AttendanceType { get; set; }

    public virtual EmployeeDetail? Employee { get; set; }
}
