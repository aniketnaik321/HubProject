using ApiHub.Domain.Models;
using ApiHub.Service.Attributes;
using ApiHub.Service.Constants;
using ApiHub.Service.DTO;
using ApiHub.Service.DTO.Common;
using ApiHub.Service.Repository.Contracts;
using ApiHub.Service.Repository.Implementations;
using ApiHub.Service.Services.Contracts;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiHub.Service.Services.Implementations
{
    [ScopedRegistration]
    public class DashboardService : IDashboardService
    {
        
        private readonly IMapper _automapper;
        private readonly IDbService _dbService;
        public DashboardService(IMapper mapper,IDbService dbService)
        {         
            _automapper = mapper;
            _dbService = dbService;
        }
    }
}
