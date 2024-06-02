using ApiHub.Domain.Models;
using ApiHub.Service.Attributes;

using ApiHub.Service.Repository.Contracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;


namespace ApiHub.Service.Repository.Implementations
{

    [ScopedRegistration]
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(HrliteDbContext context) : base(context)
        {           
        }
       public async Task<User> GetUserByIdAsync(Expression<Func<User, bool>> predicate)
        {
          return  await _context.Users.Include(u => u.UserProfiles)
                            .Include(u=>u.UserRoles).ThenInclude(v=>v.Role)
                            .FirstOrDefaultAsync(predicate);
        }
    }
}
