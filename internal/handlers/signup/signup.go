package signup

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/hj235/go-app/internal/api"
	usersPkg "github.com/hj235/go-app/internal/dataaccess/users"
	msgsPkg "github.com/hj235/go-app/internal/handlers/messages"
	"github.com/hj235/go-app/internal/handlers/utils"
	"github.com/hj235/go-app/internal/models"
)

const (
	Signup = "signup.Signup"
)

func HandleSignup(w http.ResponseWriter, r *http.Request) (*api.Response, error) {
	// REPLACE WITH DATABASE PING CHECK
	// db, err := database.GetDB()

	// if err != nil {
	// 	return nil, errors.Wrap(err, fmt.Sprintf(ErrRetrieveDatabase, Signup))
	// }

	var response = api.Response{}
	user := models.User{}
	err := json.NewDecoder(r.Body).Decode(&user)

	if err != nil {
		errorMessage := fmt.Sprintf(msgsPkg.ErrParseForm, Signup)
		return &response, utils.PrepareErrorResponse(&response, err, errorMessage, 1)
	}
	defer r.Body.Close()

	err = usersPkg.Signup(&user)
	if err != nil {
		errorMessage := fmt.Sprintf(msgsPkg.ErrRetrieveUser, Signup)
		return &response, utils.PrepareErrorResponse(&response, err, errorMessage, 1)
	}

	data, err := json.Marshal(user)
	if err != nil {
		errorMessage := fmt.Sprintf(msgsPkg.ErrEncodeView, Signup)
		return &response, utils.PrepareErrorResponse(&response, err, errorMessage, 1)
	}

	response.Payload.Data = data
	response.Messages = append(response.Messages, msgsPkg.SuccessfulSignupMessage)
	return &response, nil
}
