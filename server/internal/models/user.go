package models

import "fmt"

const (
	userIDKey   = "id"
	userNameKey = "name"
	userDateKey = "date_created"
)

type User struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	Date string `json:"date_created"`
}

func (user *User) Greet() string {
	return fmt.Sprintf("Hello, I am %s", user.Name)
}
