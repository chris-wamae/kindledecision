FROM mcr.microsoft.com/dotnet/sdk:6.0-focal AS build
WORKDIR /source
RUN pwd
COPY . .
RUN dotnet restore "KindleDecision.csproj" --disable-parallel
RUN dotnet publish "KindleDecision.csproj" -c release -o /app --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:6.0-focal as base
WORKDIR /app
COPY --from=build /app ./
EXPOSE 5000
ENTRYPOINT ["dotnet", "KindleDecision.dll"]

#Migrations
#
#FROM build AS migrations
#RUN dotnet tool install --version 6.0.9 --global dotnet-ef
#ENV PATH="$PATH:/root/.dotnet/tools"
#ENTRYPOINT  dotnet-ef database update


