using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace FairTradeApi.Models
{
    public class AppUser : IdentityUser<int>
    {
        public string OtherContact { get; set; }
        public string CompanyName { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public ICollection<AppUserRole> UserRoles { get; set; }
        public ICollection<Offer> Offers { get; set; }
        public ICollection<AppUserPhoto> AppUserPhotos { get; set; }
    }
}
