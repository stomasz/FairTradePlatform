using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FairTradeApi.Dtos.Offer;

namespace FairTradeApi.Dtos.User
{
    public class MemberDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string PhotoUrl { get; set; }
        public DateTime Created { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string OtherContact { get; set; }
        public string CompanyName { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Description { get; set; }
        
        public ICollection<OfferDto> Offers { get; set; }
        public ICollection<AppUserPhotoDto> AppUserPhotos { get; set; }
    }
}
