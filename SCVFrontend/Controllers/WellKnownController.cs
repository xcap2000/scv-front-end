using System.Text;
using Microsoft.AspNetCore.Mvc;

namespace SCVFrontend.Controllers
{
    public class WellKnownController : Controller
    {
        [Route("/.well-known/acme-challenge/OTpLftpujvFATRLVAmuStxW-6nF1Cs3MA7QCAjOuaf0")]
        public IActionResult Index()
        {
            return File(Encoding.UTF8.GetBytes("OTpLftpujvFATRLVAmuStxW-6nF1Cs3MA7QCAjOuaf0.fCta6qCK-oFf6d_ExTBGy0868GJ2a_r_H8IzWF4UNWk"), "text/plain");
        }
    }
}