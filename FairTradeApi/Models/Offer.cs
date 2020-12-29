using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FairTradeApi.Models
{
    public class Offer
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public int AppUserId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public byte ShipingTimeInDays { get; set; }
        public int MinUnits { get; set; }
        public string UnitType { get; set; }
        public float UnitPrice { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public AppUser AppUser { get; set; }
        public OfferCategory Category { get; set; }
        public ICollection<OfferPhoto> OfferPhotos { get; set; }


    }
}
