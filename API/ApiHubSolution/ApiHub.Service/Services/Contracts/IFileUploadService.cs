using ApiHub.Service.DTO;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiHub.Service.Services.Contracts
{
    public interface IFileUploadService
    {
        Task<DtoFileOutput> UploadFileAsync(IFormFile file);
        Task<byte[]> DownloadFileAsync(string fileName);
        Task<bool> RemoveFileAsync(string fileName);
    }

}
