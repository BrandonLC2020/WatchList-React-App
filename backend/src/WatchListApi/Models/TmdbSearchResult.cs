using System.Text.Json.Serialization;

namespace WatchListApi.Models;

public class TmdbSearchResult
{
    [JsonPropertyName("id")]
    public int Id { get; init; }

    [JsonPropertyName("media_type")]
    public string? MediaType { get; init; }

    [JsonPropertyName("title")]
    public string? Title { get; init; }

    [JsonPropertyName("name")]
    public string? Name { get; init; }

    [JsonPropertyName("poster_path")]
    public string? PosterPath { get; init; }

    [JsonPropertyName("profile_path")]
    public string? ProfilePath { get; init; }

    [JsonPropertyName("release_date")]
    public string? ReleaseDate { get; init; }

    [JsonPropertyName("first_air_date")]
    public string? FirstAirDate { get; init; }

    [JsonPropertyName("known_for_department")]
    public string? KnownForDepartment { get; init; }
}
