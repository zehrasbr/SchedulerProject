using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace SchedulerProject.Entities
{
    public class SchedulerContext : DbContext
    {
        public SchedulerContext() : base("name=SchedulerContext") { }
        public virtual DbSet<Event> Events { get; set; }
    }
}