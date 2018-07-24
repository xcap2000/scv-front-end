using System.Text;
using Microsoft.AspNetCore.Mvc;

namespace SCVFrontend.Controllers
{
    public class WellKnownController : Controller
    {
        [Route("/.well-known/acme-challenge/YSd9yjchIP5ou3ZaTaTQM4ElshK6TMVsScZ_GDxcUnU")]
        public IActionResult Index()
        {
            return File(Encoding.UTF8.GetBytes("YSd9yjchIP5ou3ZaTaTQM4ElshK6TMVsScZ_GDxcUnU.fCta6qCK-oFf6d_ExTBGy0868GJ2a_r_H8IzWF4UNWk"), "text/plain");
        }
    }
}