using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace OmniWatcher
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "ApiRouteSessions",
                routeTemplate: "api/Sessions/{channel}/{code}",
                defaults: new { controller = "Session", action = "GetSessions" }
            );

            config.Routes.MapHttpRoute(
                name: "ApiRouteSession",
                routeTemplate: "api/Session/{channel}/{id}",
                defaults: new { controller = "Session", action = "GetSession" }
            );

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
