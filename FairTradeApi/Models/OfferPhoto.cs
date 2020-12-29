using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FairTradeApi.Models
{
    public class OfferPhoto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }
        public Offer Offer { get; set; }
        public int OfferId { get; set; }
    }
}
