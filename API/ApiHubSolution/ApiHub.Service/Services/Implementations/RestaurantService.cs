using ApiHub.Service.Attributes;
using ApiHub.Service.Constants;
using ApiHub.Service.DTO;
using ApiHub.Service.DTO.Common;
using ApiHub.Service.DTO.RestoModels;
using ApiHub.Service.Repository.Contracts;
using ApiHub.Service.Services.Contracts;
using AutoMapper;
using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;

namespace ApiHub.Service.Services.Implementations
{
    [ScopedRegistration]
    public class RestaurantService : IRestaurantService
    {
      
        private readonly IMapper _automapper;
        private readonly IDbService _dbService;

        public RestaurantService(
          
            IMapper mapper,
            IDbService dbService
            )
        {            
         
            _dbService = dbService;
            _automapper = mapper;
        }


        public async Task<List<DtoCategory>> GetRestaurantMenuAsync(Guid restaurantId)
        {
            using (var connection = new SqlConnection(_dbService.GetConnectionString()))
            {
                var query = "usp_GetRestaurantMenu"; // Stored procedure name

                var categoryDictionary = new Dictionary<int, DtoCategory>();

                var results = await connection.QueryAsync<DtoCategory, DtoMenuItem, DtoCategory>(
                    query,
                    (category, menuItem) =>
                    {
                        // Check if the category already exists in the dictionary
                        if (!categoryDictionary.TryGetValue(category.CategoryId, out var currentCategory))
                        {
                            currentCategory = category;
                            categoryDictionary[category.CategoryId] = currentCategory;
                        }

                        // Add the menu item to the category's MenuItems list
                        currentCategory.MenuItems.Add(menuItem);
                        return currentCategory;
                    },
                    param: new { RestaurantID = restaurantId },
                    splitOn: "ItemId", // This is where we specify the split column
                    commandType: CommandType.StoredProcedure
                );

                return categoryDictionary.Values.ToList();
            }
        }


            /* public async Task<DtoCommonReponse> Create(DtoProject input)
             {
                 input.Id = Guid.NewGuid();
                 input.CreatedOn = DateTime.UtcNow;
                 var user = _automapper.Map<Domain.Models.Project>(input);
                 await _projectRepository.CreateAsync(user);

                 foreach (var item in input.UsersList ?? Array.Empty<string>())
                 {
                    await _dbService.CallProcedure(new DtoAddProjectMember()
                     {
                         ProjectId = input.Id.Value,
                         UserId = Guid.Parse(item)
                     }, AppConstants.PROC_ADD_PROJECT_MEMBERS);
                 }
                 return new DtoCommonReponse()
                 {
                     StatusCode = System.Net.HttpStatusCode.OK,
                     Message = AppConstants.SAVE_SUCCESS
                 };
             }

             */
            /*  public async Task<DtoCommonReponse> Update(DtoProject input, object id)
              {
                  var project = _automapper.Map<Domain.Models.Project>(input);
                  await _projectRepository.UpdateAsync(project);
                  foreach (var item in input.UsersList ?? Array.Empty<string>())
                  {
                      await _dbService.CallProcedure(new DtoAddProjectMember()
                      {
                          ProjectId = input.Id.Value,
                          UserId = Guid.Parse(item)
                      }, AppConstants.PROC_ADD_PROJECT_MEMBERS);
                  }

                  return new DtoCommonReponse()
                  {
                      StatusCode = System.Net.HttpStatusCode.OK,
                      Message = AppConstants.UPDATE_SUCCESS
                  };
              }
            */

            public async Task<DtoCommonReponse> Remove(object id, string userdId)
        {
            DtoDeleteRequest req = new DtoDeleteRequest()
            {
                Entity = "Project",
                Key = Convert.ToString(id)!,
                UserId = userdId
            };
            return await _dbService.CallProcedure(req, AppConstants.PROC_SOFTDELETE);
        }
        public async Task<DtoPagedResponse<DtoProject>> GetList(DtoPageRequest request)
        {
            return await _dbService.GetPaginatedResultset<DtoProject>(request, AppConstants.PROC_GETPROJECTS);
        }

        //public async Task<DtoProject> Get(object id)
        //{
        //    var members = await this.GetProjectMembers(id.ToString());
        //    var result= _automapper.Map<DtoProject>(await _projectRepository.GetByIdAsync(id));

        //    result.UsersList = members.Select(T => T.UserId.ToString().ToUpper()).ToArray();

        //    return result;
        //}

        public async Task<List<List<DtoLookup>>> GetLookups()
        {
            return await _dbService.GetDataLookupResults(AppConstants.LOOKUP_PROJECTS);
        }

        public async Task<List<DtoProjectMembers>> GetProjectMembers(string projectId)
        {
            return await _dbService.GetListFromProcedure<DtoProjectMembers, DtoProjectMemberRequest>(new DtoProjectMemberRequest()
            {
                ProjectId = Guid.Parse(projectId)
            }, AppConstants.PROC_GET_PROJECT_MEMBERS); ;
        }

        public async Task<DtoCommonReponse> AddProjectMember(DtoAddProjectMember input)
        {
            return await _dbService.CallProcedure(new DtoAddProjectMember()
            {
                ProjectId = input.ProjectId,
                UserId=input.UserId
            }, AppConstants.PROC_ADD_PROJECT_MEMBERS);
        }



        public Task<DtoCommonReponse> Create(DtoProject input)
        {
            throw new NotImplementedException();
        }

        public Task<DtoCommonReponse> Update(DtoProject input, object id)
        {
            throw new NotImplementedException();
        }

        public Task<DtoProject> Get(object id)
        {
            throw new NotImplementedException();
        }
    }
}