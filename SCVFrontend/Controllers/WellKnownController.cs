using System.Text;
using Microsoft.AspNetCore.Mvc;

namespace SCVFrontend.Controllers
{
    public class WellKnownController : Controller
    {
        [Route("/.well-known/acme-challenge/j-F2EN0mtimLTkKljvTplYgPz_LcR6kw1oSNP0lKwwY")]
        public IActionResult Index()
        {
            return File(Encoding.UTF8.GetBytes("j-F2EN0mtimLTkKljvTplYgPz_LcR6kw1oSNP0lKwwY.fCta6qCK-oFf6d_ExTBGy0868GJ2a_r_H8IzWF4UNWk"), "text/plain");
        }
    }
}