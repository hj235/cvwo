package users

import (
	"fmt"
	"log"
	"time"

	"github.com/hj235/cvwo/internal/dataaccess/utils"
	"github.com/hj235/cvwo/internal/database"
	"github.com/hj235/cvwo/internal/models"
	"github.com/pkg/errors"
)

func Signup(user *models.User) (*models.UserSensitive, error) {
	userSensitive := models.UserSensitive{}

	// Value verification
	if len(user.Name) <= 0 {
		return nil, errors.New("Name cannot be empty")
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
		return nil, errors.New("Username already exists")
	}

	// Add to database
	query := "INSERT INTO webforum.users(name, date_created) VALUES(?, ?)"
	stmt, err := db.Prepare(query)
	if err != nil {
		log.Println(err)
	}
	defer stmt.Close()

	if _, err := stmt.Exec(user.Name, user.Date); err != nil {
		log.Println(err)
	}

	userSensitive.Name = user.Name
	userSensitive.Date = user.Date

	return &userSensitive, nil
}
