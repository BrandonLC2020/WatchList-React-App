using Microsoft.AspNetCore.Mvc;

namespace WatchListApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WatchListController : ControllerBase
{
    // A placeholder record for a watchlist item
    public record WatchListItem(Guid Id, string Title, string Type);

    private static readonly List<WatchListItem> _items = new()
    {
        new(Guid.NewGuid(), "Inception", "Movie"),
        new(Guid.NewGuid(), "The Queen's Gambit", "Series")
    };

    [HttpGet]
    public IEnumerable<WatchListItem> Get()
    {
        return _items;
    }
}