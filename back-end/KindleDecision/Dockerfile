FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /source
COPY . .
RUN dotnet restore "KindleDecision.csproj" --disable-parallel
RUN dotnet publish "KindleDecision.csproj" -c release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /publish
COPY --from=build /publish ./app
EXPOSE 5000
ENTRYPOINT ["dotnet", "KindleDecision.dll"]

##MIGRATIONS

FROM build AS migrations
RUN dotnet tool install --version 6.0.9 --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"
ENTRYPOINT  dotnet-ef database update