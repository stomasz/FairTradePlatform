namespace FairTradeApi.Dtos.Offer
{
    public class OfferAddDto
    {
        public int CategoryId { get; set; }
        public int AppUserId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public byte ShipingTimeInDays { get; set; }
        public int MinUnits { get; set; }
        public string UnitType { get; set; }
    }
}
