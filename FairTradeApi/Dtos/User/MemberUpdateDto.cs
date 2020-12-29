using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FairTradeApi.Dtos.User
{
    public class MemberUpdateDto
    {
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string OtherContact { get; set; }
        public string CompanyName { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Description { get; set; }
    }
}
