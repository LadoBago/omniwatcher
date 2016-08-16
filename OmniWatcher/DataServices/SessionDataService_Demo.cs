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
                    Channel = "BankOnline",
                    CreateDate = DateTime.Now,
                    IsEmployee = false,
                    LastActiveDate = DateTime.Now,
                    SessionId = 1
                }
            };

        }

        internal override IEnumerable<SessionDataModel> GetSessions()
        {
            rwLock.AcquireReaderLock(500);
            return _Sessions;
        }

        internal override SessionDataModel GetSession(int sessionId)
        {
            rwLock.AcquireReaderLock(500);
            return _Sessions.First(e => e.SessionId == sessionId);
        }
    }
}