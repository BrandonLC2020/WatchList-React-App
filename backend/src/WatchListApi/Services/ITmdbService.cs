using System.Threading.Tasks;

namespace WatchListApi.Services
{
    public interface ITmdbService
    {
        Task<string> GetConfigurationAsync();
        Task<string> SearchMoviesAsync(string query);
    }
}
