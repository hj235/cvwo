package users

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/hj235/cvwo/internal/api"
	usersPkg "github.com/hj235/cvwo/internal/dataaccess/users"
	msgsPkg "github.com/hj235/cvwo/internal/handlers/messages"
	"github.com/hj235/cvwo/internal/handlers/utils"
	"github.com/hj235/cvwo/internal/models"
)

const (
	Edit = "edit.Edit"
)

func HandleEdit(w http.ResponseWriter, r *http.Request) (*api.Response, error) {
	var response = api.Response{}
	user := models.User{}
	err := json.NewDecoder(r.Body).Decode(&user)

	if err != nil {
		errorMessage := fmt.Sprintf(msgsPkg.ErrParseForm, Edit)
		return &response, utils.PrepareErrorResponse(&response, err, errorMessage, 1)
	}
	defer r.Body.Close()

	username := chi.URLParam(r, "username")
	password := chi.URLParam(r, "password")
	userSensitive, err := usersPkg.Edit(username, password, &user)
	if err != nil {
		errorMessage := fmt.Sprintf(msgsPkg.ErrEditFailure, Edit)
		return &response, utils.PrepareErrorResponse(&response, err, errorMessage, 1)
	}

	data, err := json.Marshal(userSensitive)
	if err != nil {
		errorMessage := fmt.Sprintf(msgsPkg.ErrEncodeView, Edit)
		return &response, utils.PrepareErrorResponse(&response, err, errorMessage, 1)
	}

	response.Payload.Data = data
	response.Messages = append(response.Messages, msgsPkg.SuccessfulEditMessage)
	return &response, nil
}
