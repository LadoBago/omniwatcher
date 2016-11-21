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
        public GetSessionsResponse GetSessions(string channel, string code)
        {
            return SessionDataService.Default.GetSessions(channel, code);
        }

        public SessionDataModel GetSession(string channel, int id)
        {
            return SessionDataService.Default.GetSession(channel, id);
        }
    }
}
