using ApiHub.Domain.Models;
using ApiHub.Service.Attributes;
using ApiHub.Service.DTO;
using ApiHub.Service.Repository.Contracts;

namespace ApiHub.Service.Repository.Implementations
{

    [ScopedRegistration]
    public class TaskRepository : GenericRepository<Issue>, ITaskRepository
    {
        public TaskRepository(HrliteDbContext context) : base(context)
        {
           
        }
    }
}
