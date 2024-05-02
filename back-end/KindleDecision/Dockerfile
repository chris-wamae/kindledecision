FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /source
COPY . .
RUN dotnet restore "KindleDecision.csproj" --disable-parallel
RUN dotnet publish "KindleDecision.csproj" -c release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /publish
COPY --from=build /publish ./app
EXPOSE 5000
ENTRYPOINT ["dotnet", "KindleDecision.dll"]


##MIGRATIONS

FROM build AS migrations
RUN dotnet tool install --version 6.0.9 --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"
ENTRYPOINT  dotnet-ef database update





#FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
#WORKDIR /app
#EXPOSE 80
#EXPOSE 443
#
#FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
#WORKDIR /src
#COPY ["Prac.csproj", "."]
#RUN dotnet restore "./Prac.csproj"
#COPY . .
#WORKDIR "/src/."
#RUN dotnet build "Prac.csproj" -c Release -o /app/build
#
#FROM build AS publish
#RUN dotnet publish "Prac.csproj" -c Release -o /app/publish /p:UseAppHost=false
#
#FROM base AS final
#WORKDIR /app
#COPY --from=publish /app/publish .
#ENTRYPOINT ["dotnet", "Prac.dll"]