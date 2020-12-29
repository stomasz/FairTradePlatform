using FairTradeApi.Models;

namespace FairTradeApi.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
