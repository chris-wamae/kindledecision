using KindleDecision.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using KindleDecision.Configurations;

namespace KindleDecision.Data
{
    public class DataContext : IdentityDbContext
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
