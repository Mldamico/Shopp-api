using API.Data;
using API.DTOs;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class PaymentsController : BaseApiController
{
    private readonly PaymentService _paymentService;
    private readonly StoreContext _context;

    public PaymentsController(PaymentService paymentService, StoreContext context)
    {
        _paymentService = paymentService;
        _context = context;
    }

    // [Authorize]
    // [HttpPost]
    // public async Task<ActionResult<BasketDto>> CreatePayment()
    // {
    //     var basket = await _context.Baskets.RetrieveBasketWithItems(User.Identity.Name).FirstOrDefaultAsync();
    //     if (basket == null) return NotFound();
    //
    //     var payment = await _paymentService.CreatePayment(basket);
    //     if (payment == null) return BadRequest(new ProblemDetails {Title = "problem creating payment"});
    //     
    //     basket.PaymentIntentId = payment.Id;
    //
    //     _context.Update(basket);
    //
    //     
    //     return basket.MapBasketToDto();
    // }
}