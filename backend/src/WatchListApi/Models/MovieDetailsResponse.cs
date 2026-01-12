namespace WatchListApi.Models;

public class MovieDetailsResponse
{
    public TmdbMovieDetails? Details { get; init; }
    public TmdbWatchProvidersResponse? Providers { get; init; }
}
