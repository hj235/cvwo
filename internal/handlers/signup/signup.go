package signup

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/hj235/go-app/internal/api"
	signupPkg "github.com/hj235/go-app/internal/dataaccess/signup"
	"github.com/hj235/go-app/internal/models"
	"github.com/pkg/errors"
)

const (
	Signup  = "signup.Signup"
	NameKey = "name"

	SuccessfulSignupMessage = "Successfully signed up"
	ErrParseForm            = "Failed to parse signup form in %s"
	ErrRetrieveDatabase     = "Failed to retrieve database in %s"
	ErrRetrieveUsers        = "Failed to retrieve users in %s"
	ErrEncodeView           = "Failed to retrieve users in %s"
)

func HandleSignup(w http.ResponseWriter, r *http.Request) (*api.Response, error) {
	// REPLACE WITH DATABASE PING CHECK
	// db, err := database.GetDB()

	// if err != nil {
	// 	return nil, errors.Wrap(err, fmt.Sprintf(ErrRetrieveDatabase, Signup))
	// }

	user := models.User{}
	err := json.NewDecoder(r.Body).Decode(&user)

	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrParseForm, Signup))
	}
	defer r.Body.Close()

	err = signupPkg.Signup(&user)
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrRetrieveUsers, Signup))
	}

	data, err := json.Marshal(user)
	if err != nil {
		return nil, errors.Wrap(err, fmt.Sprintf(ErrEncodeView, Signup))
	}

	return &api.Response{
		Payload: api.Payload{
			Data: data,
		},
		Messages: []string{SuccessfulSignupMessage},
	}, nil
}
