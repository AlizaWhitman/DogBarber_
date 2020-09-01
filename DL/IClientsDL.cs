using Entities;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DL
{
    public interface IClientsDL
    {
        Task<ActionResult<Clients>> GetClient(Clients client);
        Task<ActionResult<Clients>> DeleteClient(int id);
         Task<ActionResult<Clients>> PostClient(Clients newClient);
         Task<IActionResult> PutClient(int id, Clients updatedClient);
    }
}