using System.Text;
using Microsoft.AspNetCore.Mvc;

namespace SCVFrontend.Controllers
{
    public class WellKnownController : Controller
    {
        [Route("/.well-known/acme-challenge/5SctvNVn-S3e-AzWmsr9elV4joyUBrk6Jwd_p2Ls6A8")]
        public IActionResult Index()
        {
            return File(Encoding.UTF8.GetBytes("5SctvNVn-S3e-AzWmsr9elV4joyUBrk6Jwd_p2Ls6A8.fCta6qCK-oFf6d_ExTBGy0868GJ2a_r_H8IzWF4UNWk"), "text/plain");
        }
    }
}