package threads

import (
	"time"

	"github.com/hj235/cvwo/internal/dataaccess/utils"
	"github.com/hj235/cvwo/internal/database"
	"github.com/hj235/cvwo/internal/models"
	"github.com/pkg/errors"
)

func Create(thread *models.Thread) error {
	// Value verification
	if !utils.IsValidUsername(thread.Author) || !utils.UsernameExists(thread.Author) {
		return errors.New("thread author is missing")
	}
	if !utils.IsValidTitle(thread.Title) {
		return errors.New("thread title is missing")
	}

	thread.Created = time.Now().Format(time.DateTime)

	db := database.GetDB()

	// Add to database
	query := "INSERT INTO threads (author, title, body, time_created) VALUES(?, ?, ?, ?)"
	if _, err := db.Exec(query, thread.Author, thread.Title, thread.Body, thread.Created); err != nil {
		return errors.Wrap(err, "error adding thread")
	}

	return nil
}
