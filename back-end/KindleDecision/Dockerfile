

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /source
COPY . .
RUN dotnet restore "KindleDecision.csproj" --disable-parallel
RUN dotnet publish "KindleDecision.csproj" -c release -o /publish --no-restore
FROM mcr.microsoft.com/dotnet/aspnet:6.0 as BASE
WORKDIR /app 
COPY --from=build /publish ./publish


##MIGRATIONS
FROM build AS migrations
RUN dotnet tool install --version 6.0.9 --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"
ENTRYPOINT  dotnet-ef database update

FROM build AS final
WORKDIR /app/publish
EXPOSE 5000
ENTRYPOINT ["dotnet", "KindleDecision.dll"]


