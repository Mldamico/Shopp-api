using API.Data;
using API.DTOs;
using API.Entities;
using API.Entities.OrderAggregate;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
public class OrdersController : BaseApiController
{
    private readonly StoreContext _context;

    public OrdersController(StoreContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Order>>> GetOrders()
    {
        return await _context.Orders
            .Include(o => o.OrderItems)
            .Where(x => x.BuyerId == User.Identity.Name)
            .ToListAsync();
    }

    [HttpGet("{id}", Name = "GetOrder")]
    public async Task<ActionResult<Order>> GetOrder(int id)
    {
        return await _context.Orders.Include(x => x.OrderItems)
            .Where(x => x.BuyerId == User.Identity.Name && x.Id == id).FirstOrDefaultAsync();
    }

    [HttpPost]
    public async Task<ActionResult<int>> CreateOrder(CreateOrderDto createOrderDto)
    {
        var basket = await _context.Baskets
            .RetrieveBasketWithItems(User.Identity.Name)
            .FirstOrDefaultAsync();
        if (basket == null) return BadRequest(new ProblemDetails
        {
            Title = "Could not locate basket"
        });

        var items = new List<OrderItem>();

        foreach (var basketItem in basket.Items)
        {
            var productItem = await _context.Products.FindAsync(basketItem.ProductId);
            var itemOrdered = new ProductItemOrdered
            {
                ProductId = productItem.Id,
                Name = productItem.Name,
                PictureUrl = productItem.PictureUrl
            };
            var orderItem = new OrderItem
            {
                ItemOrdered = itemOrdered,
                Price = productItem.Price,
                Quantity = basketItem.Quantity
            };
            
            items.Add(orderItem);
            productItem.QuantityInStock -= basketItem.Quantity;
        }

        var subtotal = items.Sum(item => item.Price * item.Quantity);
        var deliveryFee = subtotal > 10000 ? 0 : 500;

        var order = new Order
        {
            OrderItems = items,
            BuyerId = User.Identity.Name,
            ShippingAddress = createOrderDto.ShippingAddress,
            SubTotal = subtotal,
            DeliveryFee = deliveryFee
        };

        _context.Orders.Add(order);
        _context.Baskets.Remove(basket);
        if (createOrderDto.SaveAddress)
        {
            var user =await _context.Users.FirstOrDefaultAsync(x => x.UserName == User.Identity.Name);
            user.Address = new UserAddress
            {
                FullName = createOrderDto.ShippingAddress.FullName,
                Address1 = createOrderDto.ShippingAddress.Address1,
                Address2 = createOrderDto.ShippingAddress.Address2,
                City = createOrderDto.ShippingAddress.City,
                State = createOrderDto.ShippingAddress.State,
                Zip = createOrderDto.ShippingAddress.Zip,
                Country = createOrderDto.ShippingAddress.Country,
            };
            _context.Update(user);
        }

        var result = await _context.SaveChangesAsync() > 0;
        if (result) return CreatedAtRoute("GetOrder", new {id = order.Id}, order.Id);

        return BadRequest("Problem creating order");
    }
}