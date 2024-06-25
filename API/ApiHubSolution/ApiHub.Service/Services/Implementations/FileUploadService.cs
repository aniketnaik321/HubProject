using ApiHub.Service.Attributes;
using ApiHub.Service.DTO;
using ApiHub.Service.Services.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Identity.Client;
using System;
using System.IO;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

[ScopedRegistration]
public class FileUploadService : IFileUploadService
{
    private readonly string _fileStoragePath;

    public FileUploadService(IConfiguration configuration)
    {
        _fileStoragePath = configuration.GetValue<string>("FileUpload:StoragePath");
        if (!Directory.Exists(_fileStoragePath))
        {
            Directory.CreateDirectory(_fileStoragePath);
        }
    }

    public async Task<DtoFileOutput> UploadFileAsync(IFormFile file)
    {
        string extension = GetFileExtension(file.FileName);
        string encodedFileName=Guid.NewGuid().ToString()+"."+extension;
        if (file == null || file.Length == 0)
        {
            throw new ArgumentException("Invalid file.");
        }

        string filePath = Path.Combine(_fileStoragePath, file.FileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        return new DtoFileOutput() { 
        EncodedFileName = encodedFileName,
        FileName=file.FileName
        };
    }

    public async Task<byte[]> DownloadFileAsync(string fileName)
    {
        string filePath = Path.Combine(_fileStoragePath, fileName);

        if (!File.Exists(filePath))
        {
            throw new FileNotFoundException("File not found.");
        }

        return await File.ReadAllBytesAsync(filePath);
    }

    private static string GetFileExtension(string fileName)
    {
        string pattern = @"\.(\w+)$";
        Match match = Regex.Match(fileName, pattern);
        if (match.Success)
        {
            return match.Groups[1].Value;
        }
        return string.Empty; // Return empty string if no extension is found
    }

    public async Task<bool> RemoveFileAsync(string fileName)
    {
        string filePath = Path.Combine(_fileStoragePath, fileName);

        if (File.Exists(filePath))
        {
            await Task.Run(() => File.Delete(filePath));
            return true;
        }

        return false;
    }
}
