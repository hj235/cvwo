package utils

import (
	"log"

	"github.com/hj235/cvwo/internal/database"
)

func UsernameExists(name string) bool {
	db, err := database.GetDB()
	if err != nil {
		log.Fatal("Failed to reach database.", err)
	}

	query := "SELECT COUNT(*) FROM webforum.users WHERE `username`=? LIMIT 1"
	rows, err := db.Query(query, name)
	if err != nil {
		log.Println("Failed to query database", err)
	}

	var count int
	rows.Next()
	rows.Scan(&count)

	return count > 0
}
