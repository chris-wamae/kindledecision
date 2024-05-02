FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["KindleDecision.csproj", "."]
RUN dotnet restore "./KindleDecision.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "KindleDecision.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "KindleDecision.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "KindleDecision.dll"]

##MIGRATIONS

FROM build AS migrations
RUN dotnet tool install --version 6.0.9 --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"
ENTRYPOINT  dotnet-ef database update





