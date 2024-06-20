using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ApiHub.Service.Attributes;
using ApiHub.Service.Constants;
using ApiHub.Service.DTO;
using ApiHub.Service.DTO.Common;
using ApiHub.Service.Services.Contracts;
using FirebaseAdmin;
using FirebaseAdmin.Messaging;
using Google.Apis.Auth.OAuth2;

using Microsoft.AspNetCore.Builder.Extensions;
using Serilog;

namespace ApiHub.Service.Services.Implementations
{

    [ScopedRegistration]

    public class PushNotificationService: IPushNotificationService
    {
        
        private readonly ILogger _logger;
        private readonly IDbService _dbService;
        public PushNotificationService(ILogger logger, IDbService dbService)
        {          
            this._logger = logger;
            this._dbService = dbService;
        }

        public async Task SendPushNotificationAsync(DtoNotificationMessage input)
        {
            var message = new Message()
            {
                Token = input.DeviceToken,
                Notification = new Notification()
                {
                    Title = input.Title,
                    Body = input.Message,
                    ImageUrl= "https://picsum.photos/200/100"

                },
            //    Data = new Dictionary<string, string>()
            //{
            //    { "key1", "value1" },
            //    { "key2", "value2" }
            //}
            };

            string response = await FirebaseMessaging.DefaultInstance.SendAsync(message);

            //Log the notification
            await _dbService.CallProcedure<DtoNotificationLogRequest>(new DtoNotificationLogRequest()
            {
                DeviceToken = input.DeviceToken,
                UserId = input.userId,
                NotificationText = input.Message,
                NotificationTitle = input.Title
            }, AppConstants.PROC_LOG_NOTIFICATION);
            
          //  Console.WriteLine("Successfully sent message: " + response);
        }

        public async Task<DtoPagedResponse<DtoNotificationResponse>> GetNotificationList(DtoPageRequest request)
        {
            return await _dbService.GetPaginatedResultset<DtoNotificationResponse>(request, AppConstants.PROC_GETNOTIFICATIONS);
        }
    }

}
