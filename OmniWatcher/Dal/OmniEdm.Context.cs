﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace OmniWatcher.Dal
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class BasisChannelsEntities1 : DbContext
    {
        public BasisChannelsEntities1()
            : base("name=BasisChannelsEntities1")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<ChannelIdentitySession> ChannelIdentitySessions { get; set; }
        public virtual DbSet<Channel> Channels { get; set; }
        public virtual DbSet<dm_client_activity_online> dm_client_activity_online { get; set; }
    }
}