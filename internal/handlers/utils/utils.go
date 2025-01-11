package utils

import (
	"github.com/hj235/go-app/internal/api"

	"github.com/pkg/errors"
)

func PrepareErrorResponse(response *api.Response, err error,
	errorMsg string, errorCode int) error {

	response.Messages = []string{errorMsg}
	response.ErrorCode = errorCode
	return errors.Wrap(err, errorMsg)
}
