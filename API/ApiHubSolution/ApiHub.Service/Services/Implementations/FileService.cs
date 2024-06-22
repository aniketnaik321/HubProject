using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Auth.OAuth2.Responses;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Google.Apis.Drive.v3;
using static Google.Apis.Drive.v3.DriveService;

namespace ApiHub.Service.Services.Implementations
{
    public class FileService
    {
        public DriveService GetService()
        {
            var tokenResponse = new TokenResponse
            {
                AccessToken = "ya29.a0AXooCguHs6K3MyDU0nGrsgd-BGlZBxUXH0RPPhu3E7qHyZ1NwjSIEhXv5GZoKSHGzOXK_Md7b8dnw-hDJ5Cc31lrH42FlaJ-ImRgjPm4FnamW9Qg9glAPQaWtk_tgAksL6OE87nSpS8KOnf40tgEUpJQLQ-xXA1hE5FHaCgYKAewSARESFQHGX2Mi0uGJPl-zjpkE_Mj9ZBem1A0171",
                RefreshToken = "1//04qJjqxzCWEfUCgYIARAAGAQSNwF-L9IrGvTBoi7BxE7Q17XMuAuxByd_TQxQ0tc5J0pDwrOQj2UnIFB22bu_7nfF5NXCCVgIVVw",
            };


            var applicationName = "HRLITE";// Use the name of the project in Google Cloud
            var username = "aniket.naik4321@gmail.com"; // Use your email


            var apiCodeFlow = new GoogleAuthorizationCodeFlow(new GoogleAuthorizationCodeFlow.Initializer
            {
                ClientSecrets = new ClientSecrets
                {
                    ClientId = "1019158484850-6jjca1i7du48p35176k3an95lhht1ie8.apps.googleusercontent.com",
                    ClientSecret = "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"
                },
                Scopes = new[] { Scope.Drive },
                DataStore = new FileDataStore(applicationName)
            });


            var credential = new UserCredential(apiCodeFlow, username, tokenResponse);


            var service = new DriveService(new BaseClientService.Initializer
            {
                HttpClientInitializer = credential,
                ApplicationName = applicationName
            });
            return service;
        }


        public string CreateFolder(string parent, string folderName)
        {
            var service = GetService();
            var driveFolder = new Google.Apis.Drive.v3.Data.File();
            driveFolder.Name = folderName;
            driveFolder.MimeType = "application/vnd.google-apps.folder";
            driveFolder.Parents = new string[] { parent };
            var command = service.Files.Create(driveFolder);
            var file = command.Execute();
            return file.Id;
        }

        public string UploadFile(Stream file, string fileName, string fileMime, string folder, string fileDescription)
        {
            DriveService service = GetService();


            var driveFile = new Google.Apis.Drive.v3.Data.File();
            driveFile.Name = fileName;
            driveFile.Description = fileDescription;
            driveFile.MimeType = fileMime;
            driveFile.Parents = new string[] { folder };


            var request = service.Files.Create(driveFile, file, fileMime);
            request.Fields = "id";

            var response = request.Upload();
            if (response.Status != Google.Apis.Upload.UploadStatus.Completed)
                throw response.Exception;

            return request.ResponseBody.Id;
        }

        public void DeleteFile(string fileId)
        {
            var service = GetService();
            var command = service.Files.Delete(fileId);
            var result = command.Execute();
        }





        public IEnumerable<Google.Apis.Drive.v3.Data.File> GetFiles(string folder)
        {
            var service = this.GetService();

            var fileList = service.Files.List();
            fileList.Q = $"mimeType!='application/vnd.google-apps.folder' and '{folder}' in parents";
            fileList.Fields = "nextPageToken, files(id, name, size, mimeType)";

            var result = new List<Google.Apis.Drive.v3.Data.File>();
            string pageToken = null;
            do
            {
                fileList.PageToken = pageToken;
                var filesResult = fileList.Execute();
                var files = filesResult.Files;
                pageToken = filesResult.NextPageToken;
                result.AddRange(files);
            } while (pageToken != null);


            return result;
        }

    }
}
