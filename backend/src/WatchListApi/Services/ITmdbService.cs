using System.Threading.Tasks;
using WatchListApi.Models;

namespace WatchListApi.Services
{
    public interface ITmdbService
    {
        Task<TmdbConfiguration?> GetConfigurationAsync();
        Task<TmdbPagedResponse<TmdbSearchResult>?> SearchMultiAsync(string query);
        Task<TmdbPagedResponse<TmdbSearchResult>?> GetTrendingAsync();
        Task<TmdbPagedResponse<TmdbSearchResult>?> DiscoverAsync(int page = 1);
        Task<TmdbMovieDetails?> GetMovieDetailsAsync(int id);
        Task<TmdbWatchProvidersResponse?> GetWatchProvidersAsync(int id);
        Task<T> GetCachedAsync<T>(string key, Func<Task<T>> fetchFunction);
    }
}
