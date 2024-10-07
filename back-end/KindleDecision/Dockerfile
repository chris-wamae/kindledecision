<<<<<<< HEAD
##See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.
#
#FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
#WORKDIR /app
#EXPOSE 80
#EXPOSE 443
#
#FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
#WORKDIR /src
#COPY ["CastaVote.csproj", "."]
#RUN dotnet restore "./CastaVote.csproj"
#COPY . .
#WORKDIR "/src/."
#RUN dotnet build "CastaVote.csproj" -c Release -o /app/build
#
#FROM build AS publish
#RUN dotnet publish "CastaVote.csproj" -c Release -o /app/publish /p:UseAppHost=false
#
#FROM base AS final
#WORKDIR /app
#COPY --from=publish /app/publish .
#ENTRYPOINT ["dotnet", "CastaVote.dll"]
=======
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





>>>>>>> 457789307ffcfbd7b1fc73237874950057a83f7d
