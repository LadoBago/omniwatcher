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
            IndexViewModel viewModel = new IndexViewModel();
            viewModel.Channels = new string[] { "BankOnline", "MobileBanking", "BasisNet2CC" };

            return View(viewModel);
        }
    }
}
