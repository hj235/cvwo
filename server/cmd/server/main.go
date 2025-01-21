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

	serverPort := os.Getenv("SERVER_PORT")
	r := router.Setup()
	fmt.Printf("Listening on port %s!\n", serverPort)

	log.Fatalln(http.ListenAndServe(fmt.Sprintf(":%s", serverPort), r))
}
