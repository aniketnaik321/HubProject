using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiHub.Service.DTO.RestoModels
{
    public class DtoCategory
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public List<DtoMenuItem> MenuItems { get; set; } = new List<DtoMenuItem>();
    }

    public class DtoMenuItem
    {
        public int ItemId { get; set; }
        public string ItemName { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
    }

}
