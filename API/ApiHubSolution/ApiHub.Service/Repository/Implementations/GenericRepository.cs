using ApiHub.Domain.Models;
using ApiHub.Service.Attributes;
using ApiHub.Service.DTO.Common;

using ApiHub.Service.Repository.Contracts;
using Azure;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace ApiHub.Service.Repository.Implementations
{
    
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly HrliteDbContext _context;

        /// <summary>
        /// Constructor GenericRepository
        /// </summary>
        /// <param name="context"></param>
        public GenericRepository(HrliteDbContext context)
        {
            this._context = context;
        }

        /// <summary>
        /// CreateAsync
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public virtual async Task CreateAsync(T entity)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    await _context.AddAsync(entity);
                    await _context.SaveChangesAsync();
                    // Perform additional operations, if any



                    _context.Database.CommitTransaction();
                }
                catch (Exception e)
                {
                    _context.Database.RollbackTransaction();
                    throw;
                }
            }
        }

        /// <summary>
        /// DeleteAsync
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public async Task DeleteAsync(T entity)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    _context.Remove(entity);
                    await _context.SaveChangesAsync();
                    // Perform additional operations, if any
                    _context.Database.CommitTransaction();
                }
                catch (Exception)
                {
                    _context.Database.RollbackTransaction();
                    throw;
                }
            }
        }

        /// <summary>
        /// GetAsync
        /// </summary>
        /// <returns></returns>
        public virtual async Task<IReadOnlyList<T>> GetAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }



        /// <summary>
        /// GetAsync
        /// </summary>
        /// <returns></returns>
        public async Task<T> GetAsync(Expression<Func<T, bool>> predicate)
        {
            return await _context.Set<T>().FirstOrDefaultAsync(predicate);
        }

        public async Task<DtoPagedResponse<T>> GetPagedDataAsync(int pageNumber, int pageSize) {

            if (pageNumber < 1)
                throw new ArgumentException("Page number should be greater than or equal to 1", nameof(pageNumber));

            if (pageSize < 1)
                throw new ArgumentException("Page size should be greater than or equal to 1", nameof(pageSize));

            DtoPagedResponse<T> response = new DtoPagedResponse<T>();
            response.data= await _context.Set<T>().Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
            response.TotalCount= await _context.Set<T>().CountAsync();
            return response;
        }

        /// <summary>
        /// GetByIdAsync
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public virtual async Task<T> GetByIdAsync(object id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        /// <summary>
        /// UpdateAsync
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public virtual async Task UpdateAsync(T entity)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    _context.Entry(entity).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                    // Perform additional operations, if any
                    _context.Database.CommitTransaction();
                }
                catch (Exception)
                {
                    _context.Database.RollbackTransaction();
                    throw;
                }
            }
        }
    }
}
