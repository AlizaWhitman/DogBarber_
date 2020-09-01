using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Entities
{
    public partial class Queue
    {
        public Queue()
        {

        }
        public int id { get; set; }
        public int? clientId { get; set; }
        public DateTime? appointmentHour { get; set; }
        public DateTime? bookingHour { get; set; }
        public virtual Clients client { get; set; }
    }
}
