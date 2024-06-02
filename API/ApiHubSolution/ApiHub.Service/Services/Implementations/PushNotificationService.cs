using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FirebaseAdmin;
using FirebaseAdmin.Messaging;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Builder.Extensions;

namespace ApiHub.Service.Services.Implementations
{
    

    public class PushNotificationService
    {
        private readonly FirebaseApp _firebaseApp;

        public PushNotificationService()
        {
            _firebaseApp = FirebaseApp.Create(new AppOptions()
            {
                Credential = GoogleCredential.FromFile("firebase_account.json"),
            });
        }

        public async Task SendPushNotificationAsync(string token, string title, string body)
        {
            var message = new Message()
            {
                Token = token,
                Notification = new Notification()
                {
                    Title = title,
                    Body = body
                },
                Data = new Dictionary<string, string>()
            {
                { "key1", "value1" },
                { "key2", "value2" }
            }
            };

            string response = await FirebaseMessaging.DefaultInstance.SendAsync(message);

            
            Console.WriteLine("Successfully sent message: " + response);
        }
    }

}
