using System.Text.Json.Serialization;

namespace WatchListApi.Models;

public class TmdbConfiguration
{
    [JsonPropertyName("images")]
    public TmdbImageConfiguration? Images { get; init; }

    [JsonPropertyName("change_keys")]
    public List<string> ChangeKeys { get; init; } = new();
}

public class TmdbImageConfiguration
{
    [JsonPropertyName("base_url")]
    public string? BaseUrl { get; init; }

    [JsonPropertyName("secure_base_url")]
    public string? SecureBaseUrl { get; init; }

    [JsonPropertyName("backdrop_sizes")]
    public List<string> BackdropSizes { get; init; } = new();

    [JsonPropertyName("logo_sizes")]
    public List<string> LogoSizes { get; init; } = new();

    [JsonPropertyName("poster_sizes")]
    public List<string> PosterSizes { get; init; } = new();

    [JsonPropertyName("profile_sizes")]
    public List<string> ProfileSizes { get; init; } = new();

    [JsonPropertyName("still_sizes")]
    public List<string> StillSizes { get; init; } = new();
}
