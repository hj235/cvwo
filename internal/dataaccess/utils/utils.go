package utils

import (
	"fmt"
	"log"

	"github.com/hj235/go-app/internal/database"
)

func UsernameExists(name string) bool {
	db, err := database.GetDB()
	if err != nil {
		fmt.Println("Failed to reach database.")
		log.Fatal(err)
	}

	query := "SELECT COUNT(*) FROM webforum.users WHERE `name`=? LIMIT 1"
	rows, err := db.Database.Query(query, name)
	if err != nil {
		fmt.Println("Failed to query database")
		log.Fatal(err)
	}

	var count int
	rows.Next()
	rows.Scan(&count)

	return count != 0
}
