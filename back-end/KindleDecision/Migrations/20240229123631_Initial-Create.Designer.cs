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
    [Migration("20240229123631_Initial-Create")]
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

                    b.Property<int>("QueryId")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("QueryId");

                    b.ToTable("Choices");
                });

            modelBuilder.Entity("KindleDecision.Models.Query", b =>
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

                    b.Property<int>("RemainingSelections")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TotalSelections")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Querys");
                });

            modelBuilder.Entity("KindleDecision.Models.Selection", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ChoiceId")
                        .HasColumnType("int");

                    b.Property<int>("SelectorUserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ChoiceId");

                    b.ToTable("Selections");
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

            modelBuilder.Entity("KindleDecision.Models.UserQuery", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("QueryId")
                        .HasColumnType("int");

                    b.HasKey("UserId", "QueryId");

                    b.HasIndex("QueryId");

                    b.ToTable("UserQuerys");
                });

            modelBuilder.Entity("KindleDecision.Models.UserSelectedInQuery", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("QueryId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("UserSelectedInQuerys");
                });

            modelBuilder.Entity("KindleDecision.Models.Choice", b =>
                {
                    b.HasOne("KindleDecision.Models.Query", "Query")
                        .WithMany("Choices")
                        .HasForeignKey("QueryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Query");
                });

            modelBuilder.Entity("KindleDecision.Models.Selection", b =>
                {
                    b.HasOne("KindleDecision.Models.Choice", "Choice")
                        .WithMany("Selections")
                        .HasForeignKey("ChoiceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Choice");
                });

            modelBuilder.Entity("KindleDecision.Models.UserQuery", b =>
                {
                    b.HasOne("KindleDecision.Models.Query", "Query")
                        .WithMany("UserQuerys")
                        .HasForeignKey("QueryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("KindleDecision.Models.User", "User")
                        .WithMany("UserQuerys")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Query");

                    b.Navigation("User");
                });

            modelBuilder.Entity("KindleDecision.Models.Choice", b =>
                {
                    b.Navigation("Selections");
                });

            modelBuilder.Entity("KindleDecision.Models.Query", b =>
                {
                    b.Navigation("Choices");

                    b.Navigation("UserQuerys");
                });

            modelBuilder.Entity("KindleDecision.Models.User", b =>
                {
                    b.Navigation("UserQuerys");
                });
#pragma warning restore 612, 618
        }
    }
}
