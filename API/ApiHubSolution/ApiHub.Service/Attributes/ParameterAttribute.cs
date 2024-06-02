using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiHub.Service.Attributes
{
  
    [AttributeUsage(AttributeTargets.Property, Inherited = false, AllowMultiple = true)]
    public class ParameterAttribute : Attribute
    {
        // You can add properties or methods to your custom attribute class
        public string? Description { get; }

        public ParameterAttribute(string? description=null)
        {
            Description = description;
        }
    }
}
