﻿using System;
using System.Collections.Generic;

namespace ApiHub.Domain.Models;

public partial class Category
{
    public long CategoryId { get; set; }

    public string? CategoryName { get; set; }

    public string? Description { get; set; }
}
