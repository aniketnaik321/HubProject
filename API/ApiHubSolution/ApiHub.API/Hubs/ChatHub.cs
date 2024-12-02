

using ApiHub.Service.Constants;
using ApiHub.Service.DTO;
using ApiHub.Service.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Drawing.Text;

namespace ApiHub.API.Hubs
{

    public class Envelope
    {
        public string message { get; set; }
        public string senderUserId { get; set; }

        public string receiverUserId { get; set; }

    }

    [Authorize]
    public sealed class ChatHub : Hub
    {

        private readonly IDbService _dbService;

        private readonly IUserChatService _userChatService;

        public ChatHub(IDbService dbService, IUserChatService userChatService)
        {
            _dbService = dbService;
            _userChatService = userChatService;
        }

        public override async Task OnConnectedAsync()
        {
            //var isAuthenticated = Context.User?.Identity?.IsAuthenticated ?? false;
            //if (!isAuthenticated)
            //{
            //    Context.Abort();
            //    return;
            //}

            //await Clients.All.SendAsync("receiveGroup", "An user have joined");

            //await base.OnConnectedAsync();

            await this.RegisterUserConnection(Context.UserIdentifier!, Context.ConnectionId);

            await Clients.All.SendAsync("ReceiveMessage", $"{Context.ConnectionId} connected.");


        }



        public async Task RegisterUserConnection(string userId, string connectionId)
        {
            DtoSignalRUserMapping input = new DtoSignalRUserMapping()
            {
                ConnectionId = connectionId,
                UserId = userId,
                ConnectionType = "CHAT",
                IsDelete = false,

            };
            try
            {
                await _dbService.CallProcedure<DtoSignalRUserMapping>(input, AppConstants.PROC_MANAGE_SIGNALR_CONNECTION);
            }
            catch (Exception ex)
            {

            }
            // Store the connectionId in the database associated with the userId


            // Optionally: broadcast or log the connection registration
        }

        // Send message to a specific group
        public async Task SendMessageToGroup(string groupName, string user, string message)
        {
            await Clients.Group(groupName).SendAsync("ReceiveMessage", user, message);
        }

        // Send message to a specific user
        public async Task SendMessageToUser(string userId, string message)
        {
            var userDetails = await _userChatService.GetConnectionIdFromUserId(new Service.DTO.DtoConnectionIdRequest() { userId = userId });
            await Clients.Client(userDetails.ConnectionId).SendAsync("ReceiveMessage", new DtoChatMessageResponse() { 
            Message = message,
            ReceiverUserId= userId,
            SenderUserId=Context.UserIdentifier!,
            CreatedDate = DateTime.UtcNow,
            IsReceived = true
            });
            await _userChatService.AddChatMessage(new DtoAddChatMessage()
            {
                Message = message,
                SenderId = Guid.Parse(Context.UserIdentifier!),
                ReceiverId = Guid.Parse(userId),

            });
        }

        // Join a specific group
        public async Task JoinGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }

        // Leave a specific group
        public async Task LeaveGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        }

    }
}
