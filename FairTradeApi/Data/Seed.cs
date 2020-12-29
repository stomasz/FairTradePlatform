using System;
using FairTradeApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;


namespace FairTradeApi.Data
{
    public static class Seed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager)
        {
           if (await userManager.Users.AnyAsync()) return; 


            var usersData = await System.IO.File.ReadAllTextAsync("Data/SeedData/AppUserSeedData.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(usersData);
            if (users == null) return;


            foreach (var user in users)
            {
                user.UserName = user.UserName.ToLower();
                await userManager.CreateAsync(user, "Password123");
            }

        }

        public static async Task SeedCategories(DataContext context)
        {
            if (await context.OfferCategories.AnyAsync()) return;

            var categoriesData = await System.IO.File.ReadAllTextAsync("Data/SeedData/OfferCategoriesSeedData.json");
            var categories = JsonSerializer.Deserialize<List<OfferCategory>>(categoriesData);
            if (categories == null) return;

           
            await context.OfferCategories.AddRangeAsync(categories);
            await context.SaveChangesAsync();
        }


        public static async Task SeedOffers(DataContext context)
        {
            if (await context.Offers.AnyAsync()) return;

            var offersData = await System.IO.File.ReadAllTextAsync("Data/SeedData/OffersSeedData.json");
            var offers = JsonSerializer.Deserialize<List<Offer>>(offersData);
            if (offers == null) return;

            await context.Offers.AddRangeAsync(offers);

            await context.SaveChangesAsync();

        }

    }
}
