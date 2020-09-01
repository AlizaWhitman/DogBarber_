using System;
using Entities;
using Microsoft.EntityFrameworkCore;

using Microsoft.EntityFrameworkCore.Metadata;

namespace DL
{
    public partial class dogBarberShopDBContext : DbContext
    {
        public dogBarberShopDBContext()
        {
        }

        public dogBarberShopDBContext(DbContextOptions<dogBarberShopDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Clients> Clients { get; set; }
        public virtual DbSet<Queue> Queue { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=DESKTOP-2GVI95M;Database=dogBarberShopDB;Trusted_Connection=True;");
            }
        }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Clients>(entity =>
            {
                entity.Property(e => e.id).HasColumnName("ID");

                entity.Property(e => e.firstName)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsFixedLength();

                entity.Property(e => e.password)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsFixedLength();

                entity.Property(e => e.userName)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsFixedLength();
            });

            modelBuilder.Entity<Queue>(entity =>
            {
                entity.Property(e => e.id).HasColumnName("ID");

                entity.Property(e => e.clientId).HasColumnName("ClientID");

                entity.HasOne(d => d.client)
                    .WithMany(p => p.Queue)
                    .HasForeignKey(d => d.clientId)
                    .HasConstraintName("FK_Queue_Clients1");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
