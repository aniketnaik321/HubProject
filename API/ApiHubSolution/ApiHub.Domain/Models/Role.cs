using System;
using System.Collections.Generic;

namespace ApiHub.Domain.Models;

public partial class Role
{
    public int Id { get; set; }

    public string? RoleTitle { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
}
