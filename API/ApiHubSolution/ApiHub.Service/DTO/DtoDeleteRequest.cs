using ApiHub.Service.Attributes;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiHub.Service.DTO
{
    public class DtoDeleteRequest
    {
        
        [Parameter]
        public string Entity { get; set; }

        [Parameter]
        public string UserId { get; set; }

        [Parameter]
        public string Key { get; set; }
    }
}
