using API.Entities;
using MercadoPago.Client.Payment;
using MercadoPago.Config;
using MercadoPago.Resource.Payment;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace API.Services;

public class PaymentService
{
    private readonly IConfiguration _config;

    public PaymentService(IConfiguration config)
    {
        _config = config;
    }

    public async Task<Payment> CreatePayment(Basket basket)
    {
        MercadoPagoConfig.AccessToken = _config["MercadoPago:AccessToken"];

        var subtotal = basket.Items.Sum(item => item.Quantity * item.Product.Price);
        var deliveryFee = subtotal > 10000 ? 0 : 500;
        
        var request = new PaymentCreateRequest
        {
            TransactionAmount = subtotal + deliveryFee,
            Token = _config["MercadoPago:PublicKey"],
            Installments = 1,
            PaymentMethodId = "debin_transfer",
            Payer = new PaymentPayerRequest
            {
                Type = "customer",
                Email = "test_payer_12345@testuser.com",
                
            },
        };
        
        

        var client = new PaymentClient();
        Payment payment = await client.CreateAsync(request);
      

        return payment;
    }
}