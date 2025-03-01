﻿using ApiHub.Domain.Models;
using ApiHub.Service.DTO;
using ApiHub.Service.DTO.Common;
using ApiHub.Service.Services.Contracts;
using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ApiHub.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class TaskController : BaseApiController
    {
        private readonly ITaskService _taskService;
        private readonly IFileUploadService _uploadService;

        public TaskController(ITaskService taskService,IFileUploadService fileUploadService) {
            this._taskService = taskService;
            this._uploadService = fileUploadService;
        }

        [HttpPost("TaskList")]
        public async Task<IActionResult> Get(DtoPageRequest input)
        {
            return Ok(await this._taskService.GetList(input));
        }

        [HttpPost("UserTaskList")]
        public async Task<IActionResult> GetUserTask(DtoPageRequest input)
        {
            input.FilterKeys = "AssigneeUserID";
            input.FilterValues = this.GetUserId();
            return Ok(await this._taskService.GetList(input));
        }

        // GET api/<ProjectController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await this._taskService.Get(id));
        }

        // POST api/<ProjectController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DtoIssues data)
        {
            return PreparePostResponse(await _taskService.Create(data));
        }

        [HttpDelete("{taskId}")]
        public async Task<IActionResult> Delete(string taskId)
        {
            var userId = this.GetUserId(); // Assuming GetUserId() is an extension method or provided by a base controller class
            var result = await _taskService.Remove(taskId, userId);

            // Assuming PreparePostResponse is a method that prepares the response based on the result from _taskService.Remove()
            return PreparePostResponse(result);
        }

        // PUT api/<ProjectController>/5
        [HttpPost("updateTask")]
        public async Task<IActionResult> Put([FromBody] DtoIssues data)
        {
            return PreparePostResponse(await _taskService.Update(data, data.Id));
        }

        [HttpGet("Lookup")]
        public async Task<IActionResult> GetLookup()
        {
            return Ok(await this._taskService.GetLookups());
        }

        [HttpPost("updateStatus")]
        public async Task<IActionResult> UpdateStatus([FromBody] DtoStatusUpdateRequest data)
        {
            data.ActionUserId= Guid.Parse(GetUserId());
            return PreparePostResponse(await _taskService.UpdateTaskStatus(data));
        }

        [HttpPost("loadUserComments")]
        public async Task<IActionResult> LoadUserComments([FromBody] DtoPostCommentRequest data)
        {   
            return Ok(await _taskService.LoadComments(data));
        }

        [HttpPost("PostUserComments")]
        public async Task<IActionResult> PostUserComments([FromForm] DtoComment data)
        {
            data.UserId = Guid.Parse(GetUserId());
            if (data.File != null && data.File.Length>0)
            {            
                var fileDetail=    await _uploadService.UploadFileAsync(data.File);
                data.EncodedFileName = fileDetail.EncodedFileName;
            }
            return PreparePostResponse(await _taskService.PostComments(data));
        }


        [HttpGet("IssueDocuments/{issueId}")]
        public async Task<IActionResult> GetDocuments(int issueId)
        {
            return Ok(await this._taskService.GetDocumentList(issueId));
        }
    }
}
