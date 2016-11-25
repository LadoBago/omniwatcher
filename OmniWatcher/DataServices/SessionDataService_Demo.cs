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
                    CreateDate = DateTime.Now.AddMinutes(-25),
                    IsEmployee = false,
                    LastActiveDate = DateTime.Now.AddMinutes(-12),
                    SessionId = 1
                },
                new SessionDataModel(){
                    Channel = "bankonline",
                    CreateDate = DateTime.Now.AddMinutes(-15),
                    IsEmployee = false,
                    LastActiveDate = DateTime.Now.AddMinutes(-1),
                    SessionId = 2
                },
                new SessionDataModel(){
                    Channel = "mobile-banking",
                    CreateDate = DateTime.Now.AddMinutes(-32),
                    IsEmployee = false,
                    LastActiveDate = DateTime.Now.AddMinutes(-3),
                    SessionId = 2
                },
                new SessionDataModel(){
                    Channel = "bn2cc-client",
                    CreateDate = DateTime.Now.AddMinutes(-20),
                    IsEmployee = false,
                    LastActiveDate = DateTime.Now.AddMinutes(-7),
                    SessionId = 2
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