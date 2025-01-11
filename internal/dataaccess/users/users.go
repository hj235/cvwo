package users

import (
	"errors"
	"fmt"
	"log"

	"github.com/hj235/go-app/internal/database"
	"github.com/hj235/go-app/internal/models"
)

func ListAll(db *database.Database) ([]models.User, error) {
	db, err := database.GetDB()
	if err != nil {
		fmt.Println("Failed to reach database.")
		log.Fatal(err)
	}

	query := "SELECT * FROM webforum.users"

	rows, err := db.Database.Query(query)
	var users []models.User

	for rows.Next() {
		user := models.User{}
		rows.Scan(&user.ID, &user.Name, &user.Date)
		users = append(users, user)
	}

	return users, nil
}

func List(name string) (*models.User, error) {
	db, err := database.GetDB()
	if err != nil {
		fmt.Println("Failed to reach database.")
		log.Fatal(err)
	}

	query := "SELECT * FROM webforum.users WHERE name=?"

	rows, err := db.Database.Query(query, name)
	var user models.User

	if !rows.Next() {
		return nil, errors.New("No user with the indicated name was found")
	}

	rows.Scan()
	rows.Scan(&user.ID, &user.Name, &user.Date)

	return &user, nil
}
