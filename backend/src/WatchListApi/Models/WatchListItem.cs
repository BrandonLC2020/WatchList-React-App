using Google.Cloud.Firestore;

namespace WatchListApi.Models;

[FirestoreData]
public class WatchListItem
{
    [FirestoreDocumentId]
    public string? Id { get; init; }

    [FirestoreProperty]
    public string UserId { get; init; } = string.Empty;

    [FirestoreProperty]
    public int TmdbId { get; init; }

    [FirestoreProperty]
    public string Title { get; init; } = string.Empty;

    [FirestoreProperty]
    public string Type { get; init; } = string.Empty;

    [FirestoreProperty]
    public string? PosterPath { get; init; }

    [FirestoreProperty]
    public int? ReleaseYear { get; init; }

    [FirestoreProperty]
    public Timestamp? AddedDate { get; init; }
}
