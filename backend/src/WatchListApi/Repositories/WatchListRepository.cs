using Google.Cloud.Firestore;
using WatchListApi.Models;

namespace WatchListApi.Repositories;

public class WatchListRepository
{
    private readonly FirestoreDb _firestoreDb;
    private const string CollectionName = "watchlist";

    public WatchListRepository(FirestoreDb firestoreDb)
    {
        _firestoreDb = firestoreDb;
    }

    public async Task<List<WatchListItem>> GetWatchlistByUserIdAsync(string userId)
    {
        CollectionReference collection = _firestoreDb.Collection(CollectionName);
        Query query = collection.WhereEqualTo("UserId", userId);
        QuerySnapshot snapshot = await query.GetSnapshotAsync();

        var items = new List<WatchListItem>();
        foreach (DocumentSnapshot document in snapshot.Documents)
        {
            if (document.Exists)
            {
                items.Add(document.ConvertTo<WatchListItem>());
            }
        }

        return items;
    }

    public async Task AddToWatchlistAsync(string userId, CreateWatchListItemRequest newItem)
    {
        CollectionReference collection = _firestoreDb.Collection(CollectionName);

        var item = new WatchListItem
        {
            UserId = userId,
            TmdbId = newItem.TmdbId,
            Title = newItem.Title,
            Type = newItem.Type,
            PosterPath = newItem.PosterPath,
            ReleaseYear = newItem.ReleaseYear,
            AddedDate = Timestamp.GetCurrentTimestamp()
        };

        await collection.AddAsync(item);
    }

    public async Task RemoveFromWatchlistAsync(string userId, int tmdbId)
    {
        CollectionReference collection = _firestoreDb.Collection(CollectionName);
        Query query = collection.WhereEqualTo("UserId", userId).WhereEqualTo("TmdbId", tmdbId);
        QuerySnapshot snapshot = await query.GetSnapshotAsync();

        foreach (DocumentSnapshot document in snapshot.Documents)
        {
            await document.Reference.DeleteAsync();
        }
    }
}
