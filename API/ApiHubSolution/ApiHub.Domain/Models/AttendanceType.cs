using System;
using System.Collections.Generic;

namespace ApiHub.Domain.Models;

public partial class AttendanceType
{
    public int Id { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<Attendance> Attendances { get; set; } = new List<Attendance>();
}
