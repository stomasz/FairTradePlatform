using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using FairTradeApi.Data;
using FairTradeApi.Dtos;
using FairTradeApi.Dtos.Offer;
using FairTradeApi.Dtos.User;
using FairTradeApi.Extensions;
using FairTradeApi.Interfaces;
using FairTradeApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FairTradeApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OfferController : ControllerBase
    {
        //private readonly DataContext _context;
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IOfferRepository _offerRepository;
        private readonly UserManager<AppUser> _userManager;
        private readonly IUserRepository _userRepository;
        private readonly IPhotoService _photoService;

        public OfferController(DataContext context, IMapper mapper, IOfferRepository offerRepository,
            UserManager<AppUser> userManager, IUserRepository userRepository, IPhotoService photoService)
        {
            
            _context = context;
            _mapper = mapper;
            _offerRepository = offerRepository;
            _userManager = userManager;
            _userRepository = userRepository;
            _photoService = photoService;
        }

        private string GetUsername()
        {
            return User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }

        private int GetUserId()
        {
            return _userManager.FindByNameAsync(GetUsername()).Result.Id;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OfferDto>>> GetOffers()
        {
            var offers = await _offerRepository.GetOffersAsync();

            return Ok(offers);
        }


        [AllowAnonymous]
        [HttpGet("categories")]
        public async Task<ActionResult<IEnumerable<OfferCategoryDto>>> GetCategories()
        {
            var categories = await _context.OfferCategories.ProjectTo<OfferCategoryDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
            return Ok(categories);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<OfferDto>> GetOfferById(int id)
        {
            return await _offerRepository.GetOfferByIdAsync(id);
        }

        [AllowAnonymous]
        [HttpGet("category/{categoryName}")]
        public async Task<ActionResult<IEnumerable<OfferDto>>> GetOffersByCategoryName(string categoryName)
        {
            var offers = await _offerRepository.GetOffersByCategoryNameAsync(categoryName);

            return Ok(offers);
        }

        
        [HttpGet("user")]
        public async Task<ActionResult<IEnumerable<OfferDto>>> GetOffersByUserame()
        {
            var offers = await _offerRepository.GetOffersByUsernameAsync(GetUsername());

            return Ok(offers);
        }

        
        [HttpPost()]
        public async Task<ActionResult> AddOffer(OfferAddDto addDto)
        {
            if (await _offerRepository.AddOffer(addDto, GetUserId())) return Ok();
            
            return BadRequest("Failed to add offer");
        }

        
        [HttpPut("edit")]
        public async Task<ActionResult> UpdateOffer(OfferUpdateDto updateDto)
        {
            if (await _offerRepository.UpdateOffer(updateDto, GetUserId())) return Ok();

            return BadRequest("Failed to update offer");
        }

        
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteOffer(int id)
        {
            if (await _offerRepository.DeleteOffer(id, GetUserId())) return Ok();

            return BadRequest("Failed to delete offer");
        }



        [HttpPost("add-photo/{id}")]
        public async Task<ActionResult<OfferPhotoDto>> AddPhoto(int id, IFormFile file)
        {
            
            var offer = await _offerRepository.GetPersonalOfferByIdAsync(id, GetUserId());

            if (offer == null) return BadRequest("TEMP WRONG ID");


            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new OfferPhoto
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            if (offer.OfferPhotos.Count == 0)
            {
                photo.IsMain = true;
            }

            offer.OfferPhotos.Add(photo);
           // user.AppUserPhotos.Add(photo);

            if (await _offerRepository.SaveAllAsync())
            {
                return _mapper.Map<OfferPhotoDto>(photo);
                //return CreatedAtRoute("GetUser", new { username = user.UserName }, _mapper.Map<AppUserPhotoDto>(photo));
            }

            return BadRequest("Something went wrong with add photos");
        }


        [HttpPut("set-main-photo/{offerId}/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int offerId, int photoId)
        {

            var offer = await _offerRepository.GetPersonalOfferByIdAsync(offerId, GetUserId());

            var photo = offer.OfferPhotos.FirstOrDefault(p => p.Id == photoId);

            if (photo != null && photo.IsMain) return BadRequest("This is already main");

            var currentMain = offer.OfferPhotos.FirstOrDefault(p => p.IsMain);
            
            if (currentMain != null) currentMain.IsMain = false;

            photo.IsMain = true;

            if (await _offerRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to set main");
        }


        [HttpDelete("delete-photo/{offerId}/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int offerId, int photoId)
        {
           // var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());4
           var offer = await _offerRepository.GetPersonalOfferByIdAsync(offerId, GetUserId());

           var photo = offer.OfferPhotos.FirstOrDefault(p => p.Id == photoId);
           // var photo = user.AppUserPhotos.FirstOrDefault(p => p.Id == photoId);

            if (photo == null) return NotFound();

            if (photo.IsMain) return BadRequest("Cannot delete main photo!");

            if (photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);

                if (result.Error != null) return BadRequest(result.Error.Message);
            }

            offer.OfferPhotos.Remove(photo);
            //user.AppUserPhotos.Remove(photo);
            if (await _offerRepository.SaveAllAsync()) return Ok();
           
            //if (await _userRepository.SaveAllAsync()) return Ok();

            return BadRequest("Something wet wrong. Failed to Delete");
        }

    }
}
