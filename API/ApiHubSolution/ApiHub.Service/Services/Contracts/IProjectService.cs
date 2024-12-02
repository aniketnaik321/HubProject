﻿using ApiHub.Service.Attributes;
using ApiHub.Service.DTO;
using ApiHub.Service.DTO.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiHub.Service.Services.Contracts
{
   
    public interface IProjectService :IGenericService<DtoProject>
    {
        Task<List<DtoProjectMembers>> GetProjectMembers(string projectId);
        Task<DtoCommonReponse> AddProjectMember(DtoAddProjectMember input);

        
    }
}
