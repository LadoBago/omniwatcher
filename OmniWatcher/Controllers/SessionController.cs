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
        public IEnumerable<SessionDataModel> Get()
        {
            return new SessionDataModel[] {
                new SessionDataModel(){
                    Channel = "BankOnline",
                    CreateDate = DateTime.Now,
                    IsEmployee = false,
                    LastActiveDate = DateTime.Now,
                    SessionId = 1
                }
            };
        }

        // GET: api/Session/5
        public SessionDataModel Get(int id)
        {
            return Get().FirstOrDefault(e => e.SessionId == id);
        }
    }
}
