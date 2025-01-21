package users

import (
	"errors"
	"fmt"
	"log"

	"github.com/hj235/cvwo/internal/database"
	"github.com/hj235/cvwo/internal/models"
)

func ListAll() ([]models.UserSensitive, error) {
	db, err := database.GetDB()
	if err != nil {
		fmt.Println("Failed to reach database.")
		log.Fatal(err)
	}

	query := "SELECT * FROM webforum.users"

	rows, err := db.Query(query)
	if err != nil {
		log.Fatal(err)
	}
	var users []models.UserSensitive

	for rows.Next() {
		user := models.UserSensitive{}
		pwPlaceholder := ""
		if err := rows.Scan(&user.Name, &pwPlaceholder, &user.Date); err != nil {
			log.Println("Error scanning row: ", err)
			return nil, err
		}
		users = append(users, user)
	}

	return users, nil
}

func getUser(name string) (*models.User, error) {
	db, err := database.GetDB()
	if err != nil {
		fmt.Println("Failed to reach database.")
		log.Fatal(err)
	}

	query := "SELECT * FROM webforum.users WHERE name=?"

	rows, err := db.Query(query, name)
	if err != nil {
		log.Fatal(err)
	}

	if !rows.Next() {
		return nil, errors.New("no user with the indicated name was found")
	}

	var user models.User
	rows.Scan(&user.Name, &user.Password, &user.Date)

	return &user, nil
}

func GetUserSensitive(name string) (*models.UserSensitive, error) {
	db, err := database.GetDB()
	if err != nil {
		fmt.Println("Failed to reach database.")
		log.Fatal(err)
	}

	query := "SELECT * FROM webforum.users WHERE name=?"

	rows, err := db.Query(query, name)
	if err != nil {
		log.Fatal(err)
	}

	if !rows.Next() {
		return nil, errors.New("no user with the indicated name was found")
	}

	var userSensitive models.UserSensitive
	var pwPlaceholder string
	rows.Scan(&userSensitive.Name, &pwPlaceholder, &userSensitive.Date)

	return &userSensitive, nil
}
