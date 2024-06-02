

using ApiHub.Domain.Models;
using ApiHub.Service.DTO;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;


namespace ApiHub.Service.Repository.Contracts
{
    public interface ICommentRepository : IGenericRepository<ApiHub.Domain.Models.Comment>
    {
        //Task<User> PostUserComment(DtoUserComment request);
    }
}
