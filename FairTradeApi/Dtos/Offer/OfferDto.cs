using System;
using System.Collections.Generic;

namespace FairTradeApi.Dtos.Offer
{
    public class OfferDto
    {
        public int Id { get; set; }
        public string PhotoUrl { get; set; }
        public string Category { get; set; }
        public string User { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public byte ShipingTimeInDays { get; set; }
        public int MinUnits { get; set; }
        public string UnitType { get; set; }
        public float UnitPrice { get; set; }
        public DateTime Created { get; set; }
        public ICollection<OfferPhotoDto> OfferPhotos { get; set; }

    }
}
