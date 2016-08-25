using OmniWatcher.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;

namespace OmniWatcher.DataServices
{
    public class SessionDataService_Demo : SessionDataService
    {
        private static ReaderWriterLock rwLock;

        private static List<SessionDataModel> _Sessions;

        static SessionDataService_Demo()
        {
            rwLock = new ReaderWriterLock();
            _Sessions = new List<SessionDataModel> {
                new SessionDataModel(){
                    Channel = "bankonline",
                    CreateDate = DateTime.Now,
                    IsEmployee = false,
                    LastActiveDate = DateTime.Now,
                    SessionId = 1
                }
            };

        }

        internal override IEnumerable<SessionDataModel> GetSessions(string channel)
        {
            rwLock.AcquireReaderLock(500);
            return _GetSessions(channel);
        }

        internal override SessionDataModel GetSession(string channel, int sessionId)
        {
            rwLock.AcquireReaderLock(500);
            return _GetSessions(channel).FirstOrDefault(e => e.SessionId == sessionId);
        }


        private IEnumerable<SessionDataModel> _GetSessions(string channel)
        {
            return _Sessions.FindAll(e => e.Channel == channel);
        }
    }
}