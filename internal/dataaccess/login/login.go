package users

import (
	"errors"

	"github.com/hj235/go-app/internal/dataaccess/users"
	"github.com/hj235/go-app/internal/dataaccess/utils"
	"github.com/hj235/go-app/internal/models"
)

func Login(user *models.User) error {
	// Value verification
	if len(user.Name) <= 0 {
		return errors.New("name cannot be empty")
	}

	// Verify that name exists
	if !utils.UsernameExists(user.Name) {
		return errors.New("username does not exist")
	}

	// Retrieve user from database
	retrievedUser, err := users.List(user.Name)
	if err != nil {
		return err
	}
	*user = *retrievedUser

	return nil
}
