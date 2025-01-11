package login

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/hj235/go-app/internal/api"
	usersPkg "github.com/hj235/go-app/internal/dataaccess/users"
	"github.com/hj235/go-app/internal/models"
	"github.com/pkg/errors"
)

const (
	Login   = "login.Login"
	NameKey = "name"

	SuccessfulLoginMessage = "Successfully logged in"
	ErrParseForm           = "Failed to parse login form in %s"
	ErrRetrieveDatabase    = "Failed to retrieve database in %s"
	ErrRetrieveUser        = "Failed to retrieve user in %s"
	ErrEncodeView          = "Failed to retrieve user in %s"
)

func HandleLogin(w http.ResponseWriter, r *http.Request) (*api.Response, error) {
	// REPLACE WITH DATABASE PING CHECK
	// db, err := database.GetDB()

	// if err != nil {
	// 	return nil, errors.Wrap(err, fmt.Sprintf(ErrRetrieveDatabase, Signup))
	// }

	var response = api.Response{}
	user := models.User{}
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		errorMessage := fmt.Sprintf(ErrParseForm, Login)
		response.Messages = []string{errorMessage}
		response.ErrorCode = 1
		return &response, errors.Wrap(err, errorMessage)
	}
	defer r.Body.Close()

	err = usersPkg.Login(&user)
	if err != nil {
		errorMessage := fmt.Sprintf(ErrRetrieveUser, Login)
		response.Messages = []string{errorMessage}
		response.ErrorCode = 1
		return &response, errors.Wrap(err, errorMessage)
	}

	data, err := json.Marshal(user)
	if err != nil {
		errorMessage := fmt.Sprintf(ErrEncodeView, Login)
		response.Messages = []string{errorMessage}
		response.ErrorCode = 1
		return &response, errors.Wrap(err, errorMessage)
	}

	response.Payload = api.Payload{
		Data: data,
	}
	response.Messages = []string{SuccessfulLoginMessage}

	return &response, nil
}
