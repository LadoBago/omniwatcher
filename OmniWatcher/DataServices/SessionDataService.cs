using OmniWatcher.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OmniWatcher.DataServices
{
    public abstract class SessionDataService
    {
        public static SessionDataService Default {
            get { return new SessionDataService_Demo(); }
        }

        internal abstract IEnumerable<SessionDataModel> GetSessions(string channel);
        internal abstract SessionDataModel GetSession(string channel, int sessionId);
    }
}