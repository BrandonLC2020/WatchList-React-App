using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using WatchListApi.Models;

namespace WatchListApi.Services
{
    public class TmdbService : ITmdbService
    {
        private readonly HttpClient _httpClient;
        private readonly TmdbSettings _tmdbSettings;

        public TmdbService(HttpClient httpClient, IOptions<TmdbSettings> tmdbSettings)
        {
            _httpClient = httpClient;
            _tmdbSettings = tmdbSettings.Value;
        }

        public async Task<string> GetConfigurationAsync()
        {
            var response = await _httpClient.GetAsync($"{_tmdbSettings.BaseUrl}/configuration?api_key={_tmdbSettings.ApiKey}");
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }

        public async Task<string> SearchMoviesAsync(string query)
        {
            var response = await _httpClient.GetAsync($"{_tmdbSettings.BaseUrl}/search/movie?api_key={_tmdbSettings.ApiKey}&query={query}");
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }
    }
}
