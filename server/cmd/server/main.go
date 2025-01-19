package main

import (
	"fmt"
	"log"
	"net/http"

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
	fmt.Println("Listening on port 8000 at http://localhost:8000!")

	log.Fatalln(http.ListenAndServe(":8000", r))
}
