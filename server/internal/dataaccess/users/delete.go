package users

import (
	"fmt"
	"log"

	"github.com/hj235/cvwo/internal/database"
	"github.com/hj235/cvwo/internal/models"
	"github.com/pkg/errors"
)

func Delete(user *models.User) error {
	// Value verification
	if len(user.Name) <= 0 {
		return errors.New("username cannot be empty")
	}
	if len(user.Password) <= 0 {
		return errors.New("password cannot be empty")
	}

	// Get database
	db, err := database.GetDB()
	if err != nil {
		fmt.Println("failed to reach database")
		log.Fatal(err)
	}

	// Retrieve user from database
	retrievedUser, err := getUser(user.Name)
	if err != nil {
		return err
	}

	// TODO: Implement jwt
	if user.Password != retrievedUser.Password {
		return errors.New("password does not match")
	}

	// Delete from database
	query := "DELETE FROM users WHERE username=? AND password=?"
	stmt, err := db.Prepare(query)
	if err != nil {
		log.Println(err)
		return err
	}
	defer stmt.Close()

	if _, err := stmt.Exec(user.Name, user.Password); err != nil {
		log.Println(err)
		return err
	}

	return nil
}
