namespace WatchListApi.Models;

public class Movie
{
    public int TmdbId { get; init; }
    public string? Title { get; init; }
    public string? PosterPath { get; init; }
    public int? ReleaseYear { get; init; }
}
