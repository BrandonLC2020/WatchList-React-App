using System.Text.Json.Serialization;

namespace WatchListApi.Models;

public class TmdbWatchProvidersResponse
{
    [JsonPropertyName("id")]
    public int Id { get; init; }

    [JsonPropertyName("results")]
    public Dictionary<string, TmdbWatchProviderRegion> Results { get; init; } = new();
}

public class TmdbWatchProviderRegion
{
    [JsonPropertyName("link")]
    public string? Link { get; init; }

    [JsonPropertyName("flatrate")]
    public List<TmdbWatchProvider> Flatrate { get; init; } = new();

    [JsonPropertyName("rent")]
    public List<TmdbWatchProvider> Rent { get; init; } = new();

    [JsonPropertyName("buy")]
    public List<TmdbWatchProvider> Buy { get; init; } = new();
}

public class TmdbWatchProvider
{
    [JsonPropertyName("provider_id")]
    public int ProviderId { get; init; }

    [JsonPropertyName("provider_name")]
    public string? ProviderName { get; init; }

    [JsonPropertyName("logo_path")]
    public string? LogoPath { get; init; }

    [JsonPropertyName("display_priority")]
    public int DisplayPriority { get; init; }
}
