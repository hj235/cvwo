package users

import (
	"errors"

	"github.com/hj235/cvwo/internal/dataaccess/utils"
	"github.com/hj235/cvwo/internal/models"
)

func Login(username string, password string) (*models.UserSensitive, error) {
	// Value verification
	if len(username) <= 0 {
		return nil, errors.New("name cannot be empty")
	}

	// Verify that name exists
	if !utils.UsernameExists(username) {
		return nil, errors.New("username does not exist")
	}

	// Retrieve user from database
	retrievedUser, err := getUser(username)
	if err != nil {
		return nil, err
	}

	// TODO: Implement jwt
	if password != retrievedUser.Password {
		return nil, errors.New("password does not match")
	}

	userSensitive := models.UserSensitive{
		Name: retrievedUser.Name,
		Date: retrievedUser.Date,
	}

	return &userSensitive, nil
}
