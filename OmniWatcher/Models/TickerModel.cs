using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OmniWatcher.Models
{
    public class GetTicksResponse
    {
        public string Code { get; set; }
        public IEnumerable<TickerModel> TicksList { get; set; }
    }

    public class TickerModel
    {
        public DateTime OpDt { get; set; }
        public string OpType { get; set; }
        public string OpDescrip { get; set; }
        public int Result { get; set; }
        public string ErrorMsg { get; set; }
        public int OpAgeMins
        {
            get { return GetDiffMins(this.OpDt); }
        }

        private Func<DateTime, int> GetDiffMins = e => (int)Math.Min((DateTime.Now - e).TotalMinutes, 60);
    }
}