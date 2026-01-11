using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WatchListApi.Services;

namespace WatchListApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MoviesController : ControllerBase
    {
        private readonly ITmdbService _tmdbService;

        public MoviesController(ITmdbService tmdbService)
        {
            _tmdbService = tmdbService;
        }

        [HttpGet("config")]
        public async Task<IActionResult> GetConfiguration()
        {
            var config = await _tmdbService.GetConfigurationAsync();
            return Ok(config);
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchMovies([FromQuery] string query)
        {
            var movies = await _tmdbService.SearchMoviesAsync(query);
            return Ok(movies);
        }
    }
}
