using Entities;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BL
{
    public interface IClientsBL
    {
        Task<ActionResult<Clients>> GetClient(Clients client);
        Task<ActionResult<Clients>> DeleteClient(int id);
        Task<ActionResult<Clients>> PostClient(Clients newClient);
        Task<IActionResult> PutClient(int id, Clients updatedClient);
    }
}