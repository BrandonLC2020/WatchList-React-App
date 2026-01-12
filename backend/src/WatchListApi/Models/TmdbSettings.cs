namespace WatchListApi.Models
{
    public class TmdbSettings
    {
        public string ApiKey { get; set; } = string.Empty;
        public string BaseUrl { get; set; } = "https://api.themoviedb.org/3";
        public int CacheMinutes { get; set; } = 30;
    }
}
