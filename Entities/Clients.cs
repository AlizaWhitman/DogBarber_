using System;
using System.Collections.Generic;

namespace Entities
{
    public partial class Clients
    {
        public Clients()
        {
            
        }

        public int id { get; set; }
        public string firstName { get; set; }
        public string userName { get; set; }
        public string password { get; set; }

        public virtual ICollection<Queue> Queue { get; set; }
    }
}
