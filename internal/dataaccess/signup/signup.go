package users

import (
	"github.com/hj235/go-app/internal/models"
)

func Signup(name string) (*models.User, error) {
	// TODO: VALUE VERIFICATION, IMPLEMENTATION
	user := models.User{
		ID:   1,
		Name: "Gob",
		Date: "Fake date",
	}
	return &user, nil
}
