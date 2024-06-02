using ApiHub.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiHub.Service.DTO.Common
{
    public class DtoComment
    {
   
        public int? Id { get; set; }

        public string UserComment { get; set; } = null!;

        public int? ParentCommentId { get; set; }

        public DateTime? EntryDate { get; set; }

        public Guid? UserId { get; set; }

        public int? IssueId { get; set; }
       
    }

}
