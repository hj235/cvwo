package users

import (
	"fmt"
	"log"

	"github.com/hj235/cvwo/internal/database"
	"github.com/hj235/cvwo/internal/models"
	"github.com/pkg/errors"
)

func Edit(username string, password string, user *models.User) (*models.UserSensitive, error) {
	// Value verification
	if len(user.Name) <= 0 {
		return nil, errors.New("username cannot be empty")
	}
	if len(user.Password) <= 0 {
		return nil, errors.New("password cannot be empty")
	}

	// Get database
	db, err := database.GetDB()
	if err != nil {
		fmt.Println("failed to reach database")
		log.Fatal(err)
	}

	// TODO: Implement jwt and authentication

	// Edit user in database
	query := "UPDATE users SET username=?, password=? WHERE username=? AND password=?"
	result, err := db.Exec(query, user.Name, user.Password, username, password)
	if err != nil {
		log.Println(err)
		return nil, err
	}
	if rowsAffected, err := result.RowsAffected(); err != nil || rowsAffected != 1 {
		return nil, errors.New(fmt.Sprintf("number of rows affected was not 1: %d rows affected", rowsAffected))
	}

	row := db.QueryRow("SELECT username, date_created FROM users WHERE username=?", user.Name)

	var updatedUser models.UserSensitive
	if err := row.Scan(&updatedUser.Name, &updatedUser.Date); err != nil {
		return nil, err
	}

	return &updatedUser, nil
}
