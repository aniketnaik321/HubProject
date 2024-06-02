

using ApiHub.Domain.Models;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;


namespace ApiHub.Service.Repository.Contracts
{
    public interface IUserRepository : IGenericRepository<ApiHub.Domain.Models.User>
    {
        Task<User> GetUserByIdAsync(Expression<Func<User, bool>> predicate);
    }
}
