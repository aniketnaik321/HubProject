

namespace ApiHub.Service.DTO
{
    public class DtoLoginResponse
    {
        public string UserId { get; set; }
        
        public string? UserName { get; set; }      
      
        public string? FullName { get; set; }

        public string? RefreshToken { get; set; }

        public string? Token { get; set; }

       
        public string? EmailId { get; set; }

        public string[] Roles { get; set; }

        public List<DtoUserProfile> UserProfiles { get; set; }

    }

    public class DtoUserProfile
    {
        public int Id { get; set; }
        public Guid? DefaultProjectId { get; set; }

    }


}
