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
            GetSessionsResponse res = new GetSessionsResponse();
            res.SessionsList = SessionDataService.Default.GetSessions(channel);
            res.Code = code;
            return res;
        }

        public SessionDataModel GetSession(string channel, int id)
        {
            return SessionDataService.Default.GetSession(channel, id);
        }
    }
}
