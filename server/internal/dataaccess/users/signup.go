package users

import (
	"fmt"
	"log"
	"time"

	"github.com/hj235/go-app/internal/dataaccess/utils"
	"github.com/hj235/go-app/internal/database"
	"github.com/hj235/go-app/internal/models"
	"github.com/pkg/errors"
)

func Signup(user *models.User) error {
	// Value verification
	if len(user.Name) <= 0 {
		return errors.New("Name cannot be empty")
	}

	user.Date = time.Now().Format(time.DateTime)

	// Get database
	db, err := database.GetDB()
	if err != nil {
		fmt.Println("Failed to reach database")
		log.Fatal(err)
	}

	// Verify that name does not already exist
	if utils.UsernameExists(user.Name) {
		return errors.New("Username already exists")
	}

	// Add to database
	query := "INSERT INTO webforum.users(name, date_created) VALUES(?, ?)"
	stmt, err := db.Database.Prepare(query)
	if err != nil {
		log.Fatal(err)
	}
	defer stmt.Close()

	if _, err := stmt.Exec(user.Name, user.Date); err != nil {
		log.Fatal(err)
	}

	// Query database for newly created user
	rows, err := db.Database.Query("SELECT * FROM webforum.users WHERE name=?", user.Name)
	if err != nil {
		log.Fatal(err)
	}
	rows.Next()

	err = rows.Scan(&user.ID, &user.Name, &user.Date)
	if err != nil {
		log.Fatal(err)
	}

	return nil
}
