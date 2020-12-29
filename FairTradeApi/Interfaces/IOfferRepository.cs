using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FairTradeApi.Dtos;
using FairTradeApi.Dtos.Offer;
using FairTradeApi.Models;

namespace FairTradeApi.Interfaces
{
    public interface IOfferRepository
    {
        Task<IEnumerable<OfferDto>> GetOffersAsync();
        Task<Offer> GetPersonalOfferByIdAsync(int id, int appUserId);
        Task<OfferDto> GetOfferByIdAsync(int id);
        Task<IEnumerable<OfferDto>> GetOffersByCategoryNameAsync(string categoryName);
        Task<IEnumerable<OfferDto>> GetOffersByUsernameAsync(string username);
        Task<bool> UpdateOffer(OfferUpdateDto updateDto, int userId);
        Task<bool> AddOffer(OfferAddDto newOffer, int appUserId);
        Task<bool> DeleteOffer(int offerId, int appUserId);
        Task<bool> SaveAllAsync();

    }
}
