using OmniWatcher.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OmniWatcher.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            string appl = this.Request.ApplicationPath;
            appl = appl.Trim('/');
            this.ViewData.Add(new KeyValuePair<string, object>("appl", appl));

            return View();
        }
    }
}
