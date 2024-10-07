# Use the .NET SDK image to build and publish the app
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /source
COPY . .
RUN dotnet restore "KindleDecision.csproj" --disable-parallel
RUN dotnet publish "KindleDecision.csproj" -c Release -o /publish --no-restore

# Stage for running EF migrations
FROM build AS migrations
RUN dotnet tool install --global dotnet-ef --version 7.0.15
ENV PATH="$PATH:/root/.dotnet/tools" 
ENTRYPOINT ["dotnet-ef", "database", "update"]

# Use the ASP.NET runtime image to run the app
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
COPY --from=build /publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "KindleDecision.dll"]





