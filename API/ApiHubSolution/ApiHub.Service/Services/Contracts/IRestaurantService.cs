using ApiHub.Service.Attributes;
using ApiHub.Service.DTO;
using ApiHub.Service.DTO.Common;
using ApiHub.Service.DTO.RestoModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiHub.Service.Services.Contracts
{
   
    public interface IRestaurantService : IGenericService<DtoProject>
    {
        Task<List<DtoCategory>> GetRestaurantMenuAsync(Guid restaurantId);


    }
}
