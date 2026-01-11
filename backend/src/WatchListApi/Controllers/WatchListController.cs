using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Mvc;

namespace WatchListApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WatchListController : ControllerBase
{
    private readonly FirestoreDb _firestoreDb;
    private const string CollectionName = "watchlist"; // Your Firestore collection name

    // Inject FirestoreDb via constructor
    public WatchListController(FirestoreDb firestoreDb)
    {
        _firestoreDb = firestoreDb;
    }

    // A placeholder record for a watchlist item
    // Note: You might want to add [FirestoreData] and [FirestoreProperty] attributes 
    // to a dedicated model class for easier serialization.
    public record WatchListItem(string Id, string Title, string Type);

    [HttpGet]
    public async Task<IEnumerable<WatchListItem>> Get()
    {
        CollectionReference collection = _firestoreDb.Collection(CollectionName);
        QuerySnapshot snapshot = await collection.GetSnapshotAsync();

        var items = new List<WatchListItem>();

        foreach (DocumentSnapshot document in snapshot.Documents)
        {
            if (document.Exists)
            {
                // Mapping manual fields effectively. 
                // For auto-mapping, create a class with [FirestoreData] attributes.
                Dictionary<string, object> data = document.ToDictionary();
                items.Add(new WatchListItem(
                    document.Id,
                    data.ContainsKey("Title") ? data["Title"].ToString() : "",
                    data.ContainsKey("Type") ? data["Type"].ToString() : ""
                ));
            }
        }

        return items;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] WatchListItem newItem)
    {
        CollectionReference collection = _firestoreDb.Collection(CollectionName);
        
        // specific object to save
        var data = new { Title = newItem.Title, Type = newItem.Type };
        
        await collection.AddAsync(data);
        
        return Ok();
    }
}