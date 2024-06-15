using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ApiHub.Service.Attributes;
using ApiHub.Service.DTO.Common;
using ApiHub.Service.Services.Contracts;
using FirebaseAdmin;
using FirebaseAdmin.Messaging;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Logging;
using Microsoft.AspNetCore.Builder.Extensions;
using Serilog.Core;

namespace ApiHub.Service.Services.Implementations
{

    [ScopedRegistration]

    public class PushNotificationService: IPushNotificationService
    {
        private readonly FirebaseApp _firebaseApp;
        private readonly ILogger _logger;

        public PushNotificationService()
        {
            _firebaseApp = FirebaseApp.Create(new AppOptions()
            {
                Credential = GoogleCredential.FromFile("firebase_account.json"),
            });
         
        }

        public async Task SendPushNotificationAsync(DtoNotificationMessage input)
        {
            var message = new Message()
            {
                Token = input.DeviceToken,
                Notification = new Notification()
                {
                    Title = input.Title,
                    Body = input.Message
                },
            //    Data = new Dictionary<string, string>()
            //{
            //    { "key1", "value1" },
            //    { "key2", "value2" }
            //}
            };

            string response = await FirebaseMessaging.DefaultInstance.SendAsync(message);

           // _logger.Info("Successfully sent message: " + response);
          //  Console.WriteLine("Successfully sent message: " + response);
        }
    }

}
