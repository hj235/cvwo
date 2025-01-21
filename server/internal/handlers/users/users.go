package users

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/hj235/cvwo/internal/api"
	usersPkg "github.com/hj235/cvwo/internal/dataaccess/users"
	msgsPkg "github.com/hj235/cvwo/internal/handlers/messages"
	"github.com/hj235/cvwo/internal/handlers/utils"
)

const (
	ListUsers = "users.HandleList"
)

func HandleListAll(w http.ResponseWriter, r *http.Request) (*api.Response, error) {
	var response = api.Response{}

	users, err := usersPkg.GetUsersSensitive()
	if err != nil {
		errorMessage := fmt.Sprintf(msgsPkg.ErrRetrieveUsers, ListUsers)
		w.WriteHeader(400)
		return &response, utils.PrepareErrorResponse(&response, err, errorMessage, 1)
	}

	data, err := json.Marshal(users)
	if err != nil {
		errorMessage := fmt.Sprintf(msgsPkg.ErrEncodeView, ListUsers)
		w.WriteHeader(400)
		return &response, utils.PrepareErrorResponse(&response, err, errorMessage, 1)
	}

	response.Payload.Data = data
	response.Messages = append(response.Messages, msgsPkg.SuccessfulListUsersMessage)

	return &response, nil
}
