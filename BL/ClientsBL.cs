using DL;
using Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class ClientsBL : IClientsBL
    {
        IClientsDL _IClientsDL;
        public ClientsBL(IClientsDL IClientsDL)
        {
            _IClientsDL = IClientsDL;
        }
        public async Task<ActionResult<Clients>> GetClient(Clients client)
        {
            return await _IClientsDL.GetClient(client);
        }
        public async Task<ActionResult<Clients>> DeleteClient(int id)
        {
            return await _IClientsDL.DeleteClient(id);
        }
        public async Task<ActionResult<Clients>> PostClient(Clients newClient)
        {
            return await _IClientsDL.PostClient(newClient);
        }
        public async Task<IActionResult> PutClient(int id, Clients updatedClient)
        {
            return await _IClientsDL.PutClient(id, updatedClient);
        }
    }
    
    
}
