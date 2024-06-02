using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ApiHub.Service.DTO.Common
{
    public class DtoCommonReponse
    {
        public string Message { get; set; }
        public HttpStatusCode StatusCode { get; set; }
        public object data { get; set; }
    }
}
