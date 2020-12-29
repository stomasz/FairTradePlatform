using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using FairTradeApi.Dtos;
using FairTradeApi.Dtos.Offer;
using FairTradeApi.Interfaces;
using FairTradeApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FairTradeApi.Data
{
    public class OfferRepository : IOfferRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public OfferRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        public async Task<IEnumerable<OfferDto>> GetOffersAsync()
        {
            return await _context.Offers.ProjectTo<OfferDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<Offer> GetPersonalOfferByIdAsync(int id, int appUserId)
        {
           return await _context.Offers.Include(o => o.OfferPhotos).Where(o => o.Id == id && o.AppUserId == appUserId).SingleOrDefaultAsync();
        }

        public async Task<OfferDto> GetOfferByIdAsync(int id)
        {
            var offer = await _context.Offers.Where(o => o.Id == id).ProjectTo<OfferDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
            return offer;
        }

        public async Task<IEnumerable<OfferDto>> GetOffersByCategoryNameAsync(string categoryName)
        {
            return await _context.Offers.Where(o => o.Category.CategoryName.ToLower() == categoryName.ToLower()).ProjectTo<OfferDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<IEnumerable<OfferDto>> GetOffersByUsernameAsync(string username)
        {
            return await _context.Offers.Where(o => o.AppUser.UserName.ToLower() == username.ToLower())
                .ProjectTo<OfferDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        
        public async Task<bool> UpdateOffer(OfferUpdateDto updateDto, int userId)
        {
            Offer offer = await _context.Offers.FirstOrDefaultAsync(o => o.Id == updateDto.Id);

            if (offer.AppUserId == userId)
            {
                offer.Title = updateDto.Title;
                offer.Description = updateDto.Description;
                offer.ShipingTimeInDays = updateDto.ShipingTimeInDays;
                offer.MinUnits = updateDto.MinUnits;

                _context.Offers.Update(offer);
            }

            if (await SaveAllAsync())
            {
                return true;
            }

            return false;

        }

        public async Task<bool> AddOffer(OfferAddDto newOffer, int appUserId)
        {
            var offer = _mapper.Map<Offer>(newOffer);

            offer.AppUserId = appUserId;

            await _context.Offers.AddAsync(offer);
            
            if (await SaveAllAsync())
            {
                return true;
            }

            return false;
        }

        public async Task<bool> DeleteOffer(int offerId, int appUserId)
        {

            Offer offer = await _context.Offers.FirstOrDefaultAsync(o => o.Id == offerId && o.AppUserId == appUserId);

            if (offer != null) _context.Remove(offer);
            
            if (await SaveAllAsync()) return true;
            
            return false;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

    }
}
