using OmniWatcher.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OmniWatcher.DataServices
{
    public abstract class SessionDataService
    {
        public SessionDataService Default {
            get { return new SessionDataService_Demo(); }
        }

        internal abstract IEnumerable<SessionDataModel> GetSessions();
        internal abstract SessionDataModel GetSession(int sessionId);
    }
}