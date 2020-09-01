using System;
using System.Collections.Generic;
using System.Text;

namespace Entities
{
    public class AppointmentDetails
    {
        public AppointmentDetails()
        {

        }
        public int id { get; set; }
        public DateTime? appointmentHour { get; set; }
        public DateTime? bookingHour { get; set; }
        public string userName { get; set; }
        public int? clientId { get; set; }

    }
}
