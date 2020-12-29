namespace FairTradeApi.Dtos.Offer
{
    public class OfferUpdateDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public byte ShipingTimeInDays { get; set; }
        public int MinUnits { get; set; }
        public string UnitType { get; set; }
    }
}
