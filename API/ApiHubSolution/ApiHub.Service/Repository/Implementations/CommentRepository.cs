using ApiHub.Domain.Models;
using ApiHub.Service.Attributes;
using ApiHub.Service.DTO;
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
    public class CommentRepository : GenericRepository<Comment>, ICommentRepository
    {
        public CommentRepository(HrliteDbContext context) : base(context)
        {           
        }
    }
}
