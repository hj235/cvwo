package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/hj235/cvwo/internal/database"
	"github.com/hj235/cvwo/internal/router"
	"github.com/joho/godotenv"
)

func main() {
	// Load env file
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("Error loading .env file")
		log.Fatal(err)
	}

	database.InitialiseDB()

	r := router.Setup()

	fmt.Printf("Listening on port %s!\n)", os.Getenv("SERVER_PORT"))
	log.Fatalln(http.ListenAndServe(":8000", r))
}
