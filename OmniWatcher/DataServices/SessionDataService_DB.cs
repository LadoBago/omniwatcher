using OmniWatcher.Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OmniWatcher.DataServices
{
    public class SessionDataService_DB : SessionDataService
    {
        internal override IEnumerable<Models.SessionDataModel> GetSessions(string channel)
        {
            var transactionOptions = new System.Transactions.TransactionOptions();
            transactionOptions.IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted;

            using (var transactionScope = new System.Transactions.TransactionScope(System.Transactions.TransactionScopeOption.Required, transactionOptions))
            {
                using (BasisChannelsEntities1 dbContext = new BasisChannelsEntities1())
                {
                    try
                    {
                        var l = from s in dbContext.ChannelIdentitySessions
                                join c in dbContext.Channels on s.ChannelID equals c.ID
                                join ca in dbContext.dm_client_activity_online on s.ID equals ca.session_id
                                where c.Code == channel
                                select new Models.SessionDataModel() { Channel = c.Code, CreateDate = s.InsertDate, IsEmployee = ca.client_employee.Value == 1, LastActiveDate = s.LastActiveDate, SessionId = s.ID };

                        return l.ToList();
                    }
                    finally
                    {
                        transactionScope.Complete();
                    }
                }
            }
        }

        internal override Models.SessionDataModel GetSession(string channel, int sessionId)
        {
            var transactionOptions = new System.Transactions.TransactionOptions();
            transactionOptions.IsolationLevel = System.Transactions.IsolationLevel.ReadUncommitted;

            using (var transactionScope = new System.Transactions.TransactionScope(System.Transactions.TransactionScopeOption.Required, transactionOptions))
            {
                using (BasisChannelsEntities1 dbContext = new BasisChannelsEntities1())
                {
                    try
                    {
                        var l = from s in dbContext.ChannelIdentitySessions
                                join c in dbContext.Channels on s.ChannelID equals c.ID
                                join ca in dbContext.dm_client_activity_online on s.ID equals ca.session_id
                                where c.Code == channel && s.ID == sessionId
                                select new Models.SessionDataModel() { Channel = c.Code, CreateDate = s.InsertDate, IsEmployee = ca.client_employee.Value == 1, LastActiveDate = s.LastActiveDate, SessionId = s.ID };

                        return l.FirstOrDefault();
                    }
                    finally
                    {
                        transactionScope.Complete();
                    }
                }
            }
        }
    }
}