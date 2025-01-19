package users

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/hj235/cvwo/internal/api"
	usersPkg "github.com/hj235/cvwo/internal/dataaccess/users"
	msgsPkg "github.com/hj235/cvwo/internal/handlers/messages"
	"github.com/hj235/cvwo/internal/handlers/utils"
	"github.com/hj235/cvwo/internal/models"
)

const (
	Login = "login.Login"
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
		errorMessage := fmt.Sprintf(msgsPkg.ErrParseForm, Login)
		return &response, utils.PrepareErrorResponse(&response, err, errorMessage, 1)
	}
	defer r.Body.Close()

	err = usersPkg.Login(&user)
	if err != nil {
		errorMessage := fmt.Sprintf(msgsPkg.ErrLoginFailure, Login)
		return &response, utils.PrepareErrorResponse(&response, err, errorMessage, 1)
	}

	data, err := json.Marshal(user)
	if err != nil {
		errorMessage := fmt.Sprintf(msgsPkg.ErrEncodeView, Login)
		return &response, utils.PrepareErrorResponse(&response, err, errorMessage, 1)
	}

	response.Payload.Data = data
	response.Messages = append(response.Messages, msgsPkg.SuccessfulLoginMessage)

	return &response, nil
}
