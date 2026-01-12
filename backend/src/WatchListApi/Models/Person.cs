namespace WatchListApi.Models;

public class Person
{
    public int TmdbId { get; init; }
    public string? Name { get; init; }
    public string? ProfilePath { get; init; }
    public string? KnownForDepartment { get; init; }
}
