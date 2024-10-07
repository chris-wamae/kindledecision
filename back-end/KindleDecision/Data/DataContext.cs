using KindleDecision.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using KindleDecision.Configurations;
using Microsoft.AspNetCore.Identity;

namespace KindleDecision.Data
{
    public class DataContext : IdentityDbContext<ApplicationUser>
    {

    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    public DbSet<Query> Querys { get; set; }

    public DbSet<User> Users { get; set; }

    public DbSet<UserQuery> UserQuerys { get; set; }

    public DbSet<Choice> Choices { get; set; }

    public DbSet<Selection> Selections { get; set; }

    public DbSet<UserSelectedInQuery> UserSelectedInQuerys { get; set; }    


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            string ADMIN_ID = "02174cf0–9412–4cfe - afbf - 59f706d72xd6";

            string SUPER_ADMIN_ROLE_ID = "341743f0 - asd2–42de - afbf - 59kmuixk72cf6";

            string ADMIN_ROLE_ID = "341743f0 - asd2–42de - afbf - 59kCwmmk72cf6";

            modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
            {
                Name = "SuperAdmin",
                NormalizedName = "SUPERADMIN",
                Id = SUPER_ADMIN_ROLE_ID,
                ConcurrencyStamp = SUPER_ADMIN_ROLE_ID
            });

            modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
            {
                Name = "Admininistrator",
                NormalizedName = "ADMINISTRATOR",
                Id = ADMIN_ROLE_ID,
                ConcurrencyStamp = ADMIN_ROLE_ID
            });

            var appUser = new ApplicationUser
            {
                Id = ADMIN_ID,
                Email = "chriswamae123@gmail.com",
                NormalizedEmail = "CHRISWAMAE123@GMAIL.COM",
                EmailConfirmed = true,
                UserName = "chriswamae123@gmail.com",
                NormalizedUserName = "CHRISWAMAE123@GMAIL.COM",
                UserId = 1
            };

            PasswordHasher<ApplicationUser> ph = new PasswordHasher<ApplicationUser>();
            appUser.PasswordHash = ph.HashPassword(appUser, "PasswordInCode?1BaaadIdea");

            modelBuilder.Entity<ApplicationUser>().HasData(appUser);


            modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
            {
                RoleId = SUPER_ADMIN_ROLE_ID,
                UserId = ADMIN_ID
            });


            modelBuilder.Entity<UserQuery>()
                .HasKey(pc => new {pc.UserId, pc.QueryId});

            modelBuilder.Entity<UserQuery>()
                .HasOne(p => p.User)
                .WithMany(pc => pc.UserQuerys)
                .HasForeignKey(c => c.UserId);

            modelBuilder.Entity<UserQuery>()
                .HasOne(p => p.Query)
                .WithMany(pc => pc.UserQuerys)
                .HasForeignKey(c => c.QueryId);

            modelBuilder.ApplyConfiguration(new RoleConfiguration());
        }

    }
}
