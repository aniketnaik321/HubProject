using ApiHub.Service.DTO;
using ApiHub.Service.DTO.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static ApiHub.Service.DTO.DtoConnectionIdRequest;

namespace ApiHub.Service.Services.Contracts
{
    public interface IDbService
    {
        Task<DtoPagedResponse<TOutput>> GetPaginatedResultset<TOutput>(DtoPageRequest input, string procedureName);
        Task<DtoCommonReponse> CallProcedure<T>(T input, string procedureName);
        Task<IEnumerable<T>> CallProcedure<T>(string procedureName);
        Task<List<List<DtoLookup>>> GetDataLookupResults(string lookupId, string procedureName="DataLookup");        
        Task<List<TOutput>> GetListFromProcedure<TOutput, TInput>(TInput input, string procedureName);

        Task<List<Dictionary<string, string>>> GetMachineEventsWithAttributes(long machineId);
       
        string GetConnectionString();
    }
}
