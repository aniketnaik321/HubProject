using ApiHub.Service.DTO.Common;
using ApiHub.Service.DTO;

namespace ApiHub.Service.Services.Contracts
{
    public interface IGenericService<T>
    {
        Task<DtoCommonReponse> Create(T input);
        Task<DtoCommonReponse> Remove(object id,string userId);
        Task<DtoCommonReponse> Update(T input, object id);
        Task<DtoPagedResponse<T>> GetList(DtoPageRequest request);
        Task<T> Get(object id);
        Task<List<List<DtoLookup>>> GetLookups();
    }
}
