using ApiHub.Service.DTO.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiHub.Service.Services.Contracts
{
    public interface IPushNotificationService
    {
        Task SendPushNotificationAsync(DtoNotificationMessage input);
    }
}
