using ApiHub.Service.Constants;
using ApiHub.Service.DTO;
using ApiHub.Service.Services;
using ApiHub.Service.Services.Contracts;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiHub.Service.Hubs
{
    public class NotificationServiceHub : Hub
    {
        private IDbService _iDbServcie;
        public NotificationServiceHub(IDbService dbService) { 
        
            _iDbServcie = dbService;
        }

        public async Task SendMessageToUser(string userId, string message)
        {
             await Clients.Client(userId).SendAsync("ReceiveMessage", message);
            //   await Clients.All.SendAsync("ReceiveMessage", message);
        }

        public async Task RegisterUserConnection(string userId, string connectionId)
        {
            DtoSignalRUserMapping input = new DtoSignalRUserMapping() { 
            ConnectionId = connectionId,
            UserId = userId,
            ConnectionType="NOTIFICATION",
            IsDelete = false,

            };
            try {

                await _iDbServcie.CallProcedure<DtoSignalRUserMapping>(input,AppConstants.PROC_MANAGE_SIGNALR_CONNECTION);
            } catch (Exception ex) {
            
            }
            // Store the connectionId in the database associated with the userId
           

            // Optionally: broadcast or log the connection registration
        }


    }
}
