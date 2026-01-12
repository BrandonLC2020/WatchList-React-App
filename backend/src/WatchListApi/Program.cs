using WatchListApi.Models;
using WatchListApi.Services;
using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using WatchListApi.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddMemoryCache();

// Configure TmdbSettings
builder.Services.Configure<TmdbSettings>(builder.Configuration.GetSection("Tmdb"));

// 1. Read configuration
var projectId = builder.Configuration["Firebase:ProjectId"];
var credentialPath = builder.Configuration["Firebase:CredentialPath"];

if (string.IsNullOrWhiteSpace(projectId))
{
    throw new InvalidOperationException("Firebase:ProjectId is required.");
}

// 2. Set the environment variable for authentication (if using a file path)
if (!string.IsNullOrEmpty(credentialPath))
{
    Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", credentialPath);
}

// 3. Register FirestoreDb as a Singleton
builder.Services.AddSingleton<FirestoreDb>(provider => 
    FirestoreDb.Create(projectId));

builder.Services.AddHttpClient<ITmdbService, TmdbService>();
builder.Services.AddScoped<WatchListRepository>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = $"https://securetoken.google.com/{projectId}";
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = $"https://securetoken.google.com/{projectId}",
            ValidateAudience = true,
            ValidAudience = projectId,
            ValidateLifetime = true
        };
    });
builder.Services.AddAuthorization();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
