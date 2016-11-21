using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OmniWatcher.Models
{

    public class GetSessionsResponse
    {
        public string Code { get; set; }
        public IEnumerable<SessionDataModel> SessionsList { get; set; }
    }

    public class SessionDataModel
    {
        public string Channel { get; set; }
        public int SessionId { get; set; }

        public DateTime CreateDate
        {
            get; set;
        }

        public DateTime LastActiveDate
        {
            get; set;
        }
        public bool IsEmployee { get; set; }

        public int SessionExistMins
        {
            get { return GetDiffMins(this.CreateDate); }
        }
        public int SessionDeactMins
        {
            get { return GetDiffMins(this.LastActiveDate); }
        }

        private Func<DateTime, int> GetDiffMins = e => (int)Math.Min((DateTime.Now - e).TotalMinutes, 60);
    }
}