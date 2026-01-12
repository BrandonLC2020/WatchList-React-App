namespace WatchListApi.Models;

public class CreateWatchListItemRequest
{
    public int TmdbId { get; init; }
    public string Title { get; init; } = string.Empty;
    public string Type { get; init; } = string.Empty;
    public string? PosterPath { get; init; }
    public int? ReleaseYear { get; init; }
}
