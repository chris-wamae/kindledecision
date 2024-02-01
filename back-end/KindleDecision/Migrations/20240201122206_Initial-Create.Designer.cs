﻿// <auto-generated />
using System;
using KindleDecision.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace KindleDecision.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20240201122206_Initial-Create")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.15")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("KindleDecision.Models.Choice", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ElectionId")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ElectionId");

                    b.ToTable("Choices");
                });

            modelBuilder.Entity("KindleDecision.Models.Election", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreationTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("CreatorUserId")
                        .HasColumnType("int");

                    b.Property<DateTime>("ExpiryDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("RemainingVotes")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TotalVotes")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Elections");
                });

            modelBuilder.Entity("KindleDecision.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Language")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("KindleDecision.Models.UserElection", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("ElectionId")
                        .HasColumnType("int");

                    b.HasKey("UserId", "ElectionId");

                    b.HasIndex("ElectionId");

                    b.ToTable("UserElections");
                });

            modelBuilder.Entity("KindleDecision.Models.Vote", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ChoiceId")
                        .HasColumnType("int");

                    b.Property<int>("VoterUserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ChoiceId");

                    b.ToTable("Votes");
                });

            modelBuilder.Entity("KindleDecision.Models.Choice", b =>
                {
                    b.HasOne("KindleDecision.Models.Election", "Election")
                        .WithMany("Choices")
                        .HasForeignKey("ElectionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Election");
                });

            modelBuilder.Entity("KindleDecision.Models.UserElection", b =>
                {
                    b.HasOne("KindleDecision.Models.Election", "Election")
                        .WithMany("UserElections")
                        .HasForeignKey("ElectionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("KindleDecision.Models.User", "User")
                        .WithMany("UserElections")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Election");

                    b.Navigation("User");
                });

            modelBuilder.Entity("KindleDecision.Models.Vote", b =>
                {
                    b.HasOne("KindleDecision.Models.Choice", "Choice")
                        .WithMany("Votes")
                        .HasForeignKey("ChoiceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Choice");
                });

            modelBuilder.Entity("KindleDecision.Models.Choice", b =>
                {
                    b.Navigation("Votes");
                });

            modelBuilder.Entity("KindleDecision.Models.Election", b =>
                {
                    b.Navigation("Choices");

                    b.Navigation("UserElections");
                });

            modelBuilder.Entity("KindleDecision.Models.User", b =>
                {
                    b.Navigation("UserElections");
                });
#pragma warning restore 612, 618
        }
    }
}
