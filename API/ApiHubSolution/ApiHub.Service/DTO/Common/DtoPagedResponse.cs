using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiHub.Service.DTO.Common
{
    public class DtoPagedResponse<T> 
    {
        public int PageNumber { get; set; } 
        public int TotalCount { get; set; } = 0;
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
        public List<T>? data { get; set; }
    }
}
