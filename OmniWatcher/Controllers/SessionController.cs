using OmniWatcher.DataServices;
using OmniWatcher.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace OmniWatcher.Controllers
{
    public class SessionController : ApiController
    {
        // GET: api/Session
        public IEnumerable<SessionDataModel> Get(string channel)
        {
            return SessionDataService.Default.GetSessions(channel);
        }

        // GET: api/Session/5
        public SessionDataModel Get(string channel, int id)
        {
            return SessionDataService.Default.GetSession(channel, id);
        }
    }
}
