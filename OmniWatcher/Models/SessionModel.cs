using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OmniWatcher.Models
{
    public class SessionDataModel
    {
        public string Channel { get; set; }
        public int SessionId { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime LastActiveDate { get; set; }
        public bool IsEmployee { get; set; }
    }
}