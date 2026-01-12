namespace WatchListApi.Models;

public class TvShow
{
    public int TmdbId { get; init; }
    public string? Name { get; init; }
    public string? PosterPath { get; init; }
    public int? FirstAirYear { get; init; }
}
