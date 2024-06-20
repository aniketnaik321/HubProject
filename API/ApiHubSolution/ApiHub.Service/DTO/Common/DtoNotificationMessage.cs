using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiHub.Service.DTO.Common
{
    public class DtoNotificationMessage
    {
        public string userId { get;set; }
        public string Message { get; set; }
        public string Title { get; set; }
        public string DeviceToken { get;set; }
        public string Extra1 { get; set; }
        public string Extra2 { get; set; }
    }
}
