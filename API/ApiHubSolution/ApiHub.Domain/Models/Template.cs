using System;
using System.Collections.Generic;

namespace ApiHub.Domain.Models;

public partial class Template
{
    public long TemplateId { get; set; }

    public string? TemplateName { get; set; }

    public string? Description { get; set; }

    /// <summary>
    /// 1: Email Template
    /// </summary>
    public int? TemplateType { get; set; }

    public string? TemplateContent { get; set; }
}
