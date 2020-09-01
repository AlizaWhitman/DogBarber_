using Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DL
{
    public class ClientsDL : IClientsDL
    {
        dogBarberShopDBContext _context;

        public ClientsDL(dogBarberShopDBContext dogBarberShopDBContext)
        {
            _context = dogBarberShopDBContext;
        }

        public async Task<ActionResult<Clients>> PostClient([FromBody]Clients newClient)
        {
            _context.Clients.Add(newClient);
            await _context.SaveChangesAsync();
            return newClient;
        }

        public async Task<IActionResult> PutClient(int id, Clients updatedClient)
        {
            updatedClient.id = id;

            _context.Entry(updatedClient).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClientExists(id))
                {
                    return null;
                }
                else
                {
                    throw;
                }
            }
            return null;
        }

        public async Task<ActionResult<Clients>> DeleteClient(int id)
        {
            var clientToDelete = await _context.Clients.FindAsync(id);
            if (clientToDelete != null)
            {
                _context.Clients.Remove(clientToDelete);
            }

            await _context.SaveChangesAsync();
            return clientToDelete;
        }
        public async Task<ActionResult<Clients>> GetClient([FromBody]Clients client)
        {
            List<Clients> list = await _context.Clients.ToListAsync();//WHY BRING THE WHOLE LIST???
            foreach (var c in list)
            {
                if(c.userName.TrimEnd() == client.userName && c.password.TrimEnd()==client.password)
                    return c;
            }               
            return null;
        }

        private bool ClientExists(int id)
        {
            if (_context.Clients.FindAsync(id) != null)
                return true;
            return false;
        }
    }
}
