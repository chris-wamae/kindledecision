
##Build Stage
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /source
COPY . .
RUN dotnet restore "./KindleDesision.csproj" --disable-parallel
RUN dotnet publish "./KindleDecision.csproj" -c release -o /publish --no-restore
FROM mcr.microsoft.com/dotnet/aspnet:6.0 as BASE
WORKDIR /app 
COPY --from=build /publish ./publish

#Serve Stage as BASE

FROM base AS final
WORKDIR /app/publish
EXPOSE 5000
ENTRYPOINT ["dotnet", "KindleDecision.dll"]
