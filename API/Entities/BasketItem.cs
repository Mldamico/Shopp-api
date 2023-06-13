using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;

[Table("BasketItems")]
public class BasketItem
{
    public int Id { get; set; }
    public int Quantity { get; set; }
    
    //Navigation properties for relationship in Entity0000
    public int ProductId { get; set; }
    public Product Product { get; set; }
    
    public int BasketId { get; set; }
    public Basket Basket { get; set; }
}