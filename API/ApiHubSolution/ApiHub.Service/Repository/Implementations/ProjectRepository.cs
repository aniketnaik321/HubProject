using ApiHub.Domain.Models;
using ApiHub.Service.Attributes;
using ApiHub.Service.Repository.Contracts;

namespace ApiHub.Service.Repository.Implementations
{

    [ScopedRegistration]
    public class ProjectRepository : GenericRepository<Project>, IProjectRepository
    {
        public ProjectRepository(HrliteDbContext context) : base(context)
        {
           
        }
    }
}
