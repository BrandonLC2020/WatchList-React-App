using WatchListApi.Models;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configure TmdbSettings
builder.Services.Configure<TmdbSettings>(builder.Configuration.GetSection("Tmdb"));

// 1. Read configuration
var projectId = builder.Configuration["Firebase:ProjectId"];
var credentialPath = builder.Configuration["Firebase:CredentialPath"];

// 2. Set the environment variable for authentication (if using a file path)
if (!string.IsNullOrEmpty(credentialPath))
{
    Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", credentialPath);
}

// 3. Register FirestoreDb as a Singleton
builder.Services.AddSingleton<FirestoreDb>(provider => 
    FirestoreDb.Create(projectId));

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
app.MapControllers();

app.Run();
