package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/joho/godotenv"
	"github.com/princepal9120/ai-movie-recommedation/server/database"
	"github.com/princepal9120/ai-movie-recommedation/server/models"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

func main() {
	// Load environment variables
	err := godotenv.Load(".env")
	if err != nil {
		log.Println("Warning: .env file not found")
	}

	// Connect to database
	client := database.Connect()
	defer func() {
		if err := client.Disconnect(context.Background()); err != nil {
			log.Fatalf("Failed to disconnect from MongoDB: %v", err)
		}
	}()

	// Seed genres
	if err := seedGenres(client); err != nil {
		log.Fatalf("Failed to seed genres: %v", err)
	}

	// Seed rankings
	if err := seedRankings(client); err != nil {
		log.Fatalf("Failed to seed rankings: %v", err)
	}

	fmt.Println("Database seeded successfully!")
}

func seedGenres(client *mongo.Client) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	genreCollection := database.OpenCollection("genres", client)

	// Check if genres already exist
	count, err := genreCollection.CountDocuments(ctx, bson.D{})
	if err != nil {
		return err
	}

	if count > 0 {
		fmt.Printf("Genres already exist (%d genres). Skipping...\n", count)
		return nil
	}

	// Define genres
	genres := []models.Genre{
		{GenreID: 1, GenreName: "Action"},
		{GenreID: 2, GenreName: "Adventure"},
		{GenreID: 3, GenreName: "Animation"},
		{GenreID: 4, GenreName: "Comedy"},
		{GenreID: 5, GenreName: "Crime"},
		{GenreID: 6, GenreName: "Documentary"},
		{GenreID: 7, GenreName: "Drama"},
		{GenreID: 8, GenreName: "Fantasy"},
		{GenreID: 9, GenreName: "Horror"},
		{GenreID: 10, GenreName: "Mystery"},
		{GenreID: 11, GenreName: "Romance"},
		{GenreID: 12, GenreName: "Sci-Fi"},
		{GenreID: 13, GenreName: "Thriller"},
		{GenreID: 14, GenreName: "Western"},
		{GenreID: 15, GenreName: "Musical"},
		{GenreID: 16, GenreName: "War"},
		{GenreID: 17, GenreName: "Historical"},
		{GenreID: 18, GenreName: "Biography"},
		{GenreID: 19, GenreName: "Sport"},
		{GenreID: 20, GenreName: "Family"},
	}

	// Convert to interface slice
	var documents []interface{}
	for _, genre := range genres {
		documents = append(documents, genre)
	}

	// Insert genres
	result, err := genreCollection.InsertMany(ctx, documents)
	if err != nil {
		return err
	}

	fmt.Printf("Inserted %d genres\n", len(result.InsertedIDs))
	return nil
}

func seedRankings(client *mongo.Client) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	rankingCollection := database.OpenCollection("rankings", client)

	// Check if rankings already exist
	count, err := rankingCollection.CountDocuments(ctx, bson.D{})
	if err != nil {
		return err
	}

	if count > 0 {
		fmt.Printf("Rankings already exist (%d rankings). Skipping...\n", count)
		return nil
	}

	// Define rankings
	rankings := []models.Ranking{
		{RankingValue: 1, RankingName: "Excellent"},
		{RankingValue: 2, RankingName: "Very Good"},
		{RankingValue: 3, RankingName: "Good"},
		{RankingValue: 4, RankingName: "Average"},
		{RankingValue: 5, RankingName: "Below Average"},
		{RankingValue: 6, RankingName: "Poor"},
		{RankingValue: 999, RankingName: "Not Rated"},
	}

	// Convert to interface slice
	var documents []interface{}
	for _, ranking := range rankings {
		documents = append(documents, ranking)
	}

	// Insert rankings
	result, err := rankingCollection.InsertMany(ctx, documents)
	if err != nil {
		return err
	}

	fmt.Printf("Inserted %d rankings\n", len(result.InsertedIDs))
	return nil
}
