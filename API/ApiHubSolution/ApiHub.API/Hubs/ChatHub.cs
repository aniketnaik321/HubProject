

using Microsoft.AspNetCore.SignalR;

namespace ApiHub.API.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessageToUser(string userId, string message)
        {
            //  await Clients.User(userId).SendAsync("ReceiveMessage", message);
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}
