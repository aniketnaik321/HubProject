using ApiHub.Service.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ApiHub.Service.DTO.Common
{
    public class DtoPageRequest
    {
        [Parameter]
        public int PageNumber { get;set; }
        [Parameter]
        public int PageSize{ get; set; }
        [Parameter]
        public string? FilterKeys { get; set; }

        [Parameter]
        public string? FilterValues { get; set; }
        
        [Parameter]
        public string? OrderByKey { get; set; }

        [Parameter]
        [JsonIgnore]
        public string? UserId { get; set; }

        public List<string>? filterKeySet { get; set; }
        public List<string>? filterValueSet { get; set; }

        public int? SortDirection { set
            {
                if (value == 1)
                { 
                    this.OrderByDirection = "ASC"; 
                }
                else
                {
                    this.OrderByDirection = "DESC";
                }
            }
        }

       [Parameter]
       [JsonIgnore]
        public string? OrderByDirection { get; set; } = "ASC";
    }
}
