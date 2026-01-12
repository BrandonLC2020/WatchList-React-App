using System.Text.Json.Serialization;

namespace WatchListApi.Models;

public class TmdbPagedResponse<T>
{
    [JsonPropertyName("page")]
    public int Page { get; init; }

    [JsonPropertyName("results")]
    public List<T> Results { get; init; } = new();

    [JsonPropertyName("total_pages")]
    public int TotalPages { get; init; }

    [JsonPropertyName("total_results")]
    public int TotalResults { get; init; }
}
