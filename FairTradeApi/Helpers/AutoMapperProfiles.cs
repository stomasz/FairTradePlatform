using System.Linq;
using AutoMapper;
using FairTradeApi.Dtos;
using FairTradeApi.Dtos.Offer;
using FairTradeApi.Dtos.User;
using FairTradeApi.Models;

namespace FairTradeApi.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            //User
            CreateMap<RegisterDto, AppUser>();
            CreateMap<AppUser, MemberDto>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src =>
                    src.AppUserPhotos.FirstOrDefault(x => x.IsMain).Url)); 
            CreateMap<AppUserPhoto, AppUserPhotoDto>();
            CreateMap<MemberUpdateDto, AppUser>();

            //Offer

            CreateMap<Offer, OfferDto>().ForMember(dest => dest.Category,
                    opt => opt.MapFrom(src => src.Category.CategoryName))
                .ForMember(dest => dest.User, opt =>
                    opt.MapFrom(src => src.AppUser.UserName)).ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom( src =>
                    src.OfferPhotos.FirstOrDefault(p=> p.IsMain).Url));
            CreateMap<OfferPhoto, OfferPhotoDto>();
            CreateMap<OfferCategory, OfferCategoryDto>();
            

            CreateMap<OfferAddDto, Offer>();
            CreateMap<OfferUpdateDto, Offer>().ForMember(dest => dest.Id, opt => opt.Ignore());
            
        }
    }
}
