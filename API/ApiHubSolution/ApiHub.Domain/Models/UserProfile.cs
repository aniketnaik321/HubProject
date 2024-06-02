using System;
using System.Collections.Generic;

namespace ApiHub.Domain.Models;

public partial class UserProfile
{
    public int Id { get; set; }

    public Guid? DefaultProjectId { get; set; }

    public Guid? UserId { get; set; }

    public virtual User? User { get; set; }
}
