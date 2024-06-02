using ApiHub.Domain.Models;
using ApiHub.Service.DTO;
using ApiHub.Domain.Models;
using AutoMapper;
using Microsoft.AspNetCore.Routing.Matching;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Attribute = System.Attribute;
using ApiHub.Service.DTO.Common;

namespace ApiHub.Service.MappingProfiles
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            //For get record mapping
            CreateMap<Domain.Models.Comment, DtoUserComment>().ReverseMap();
            CreateMap<Domain.Models.Comment, DtoComment>().ReverseMap();
            CreateMap<Domain.Models.UserProfile, DtoUserProfile>().ReverseMap();
            CreateMap<User,DtoLoginResponse>();
            CreateMap<Domain.Models.User, DtoUser>().ReverseMap();
            CreateMap<Domain.Models.UserProfile, DtoUserProfile>().ReverseMap();
            CreateMap<Domain.Models.User, DtoRegisterUserModel>().ReverseMap();
            CreateMap<Domain.Models.Project, DtoProject>().ReverseMap();
            CreateMap<Domain.Models.Issue, DtoIssues>().ReverseMap();
            
        }
    }
}
