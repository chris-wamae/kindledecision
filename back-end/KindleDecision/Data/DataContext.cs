using KindleDecision.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore;


namespace KindleDecision.Data
{
    public class DataContext : DbContext
    {

    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    public DbSet<Election> Elections { get; set; }

    public DbSet<User> Users { get; set; }

    public DbSet<UserElection> UserElections { get; set; }

    public DbSet<Choice> Choices { get; set; }

    public DbSet<Vote> Votes { get; set; }

    public DbSet<UserVotedInElection> UserVotedInElections { get; set; }    


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserElection>()
                .HasKey(pc => new {pc.UserId, pc.ElectionId});

            modelBuilder.Entity<UserElection>()
                .HasOne(p => p.User)
                .WithMany(pc => pc.UserElections)
                .HasForeignKey(c => c.UserId);

            modelBuilder.Entity<UserElection>()
                .HasOne(p => p.Election)
                .WithMany(pc => pc.UserElections)
                .HasForeignKey(c => c.ElectionId);
        }

    }
}
