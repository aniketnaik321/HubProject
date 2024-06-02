using ApiHub.Service.DTO.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ApiHub.Service.Repository.Contracts
{
    public interface IGenericRepository<T> where T : class
    {
        /// <summary>
        /// GetAsync
        /// </summary>
        /// <returns></returns>
        Task<IReadOnlyList<T>> GetAsync();

        /// <summary>
        /// Get Method with predicate input.
        /// </summary>
        /// <param name="predicate"></param>
        /// <returns></returns>
        Task<T> GetAsync(Expression<Func<T, bool>> predicate);

        /// <summary>
        /// GetAsync
        /// </summary>
        /// <returns></returns>
        Task<DtoPagedResponse<T>> GetPagedDataAsync(int pageNumber, int pageSize);

        /// <summary>
        /// GetByIdAsync
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<T> GetByIdAsync(object id);

        /// <summary>
        /// CreateAsync
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        Task CreateAsync(T entity);

        /// <summary>
        /// UpdateAsync
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        Task UpdateAsync(T entity);

        /// <summary>
        /// DeleteAsync
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        Task DeleteAsync(T entity);
    }
}