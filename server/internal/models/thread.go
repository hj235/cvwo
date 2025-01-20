package models

const (
	ThreadIdKey      = "id"
	ThreadNameKey    = "author"
	ThreadTitleKey   = "title"
	ThreadBodyKey    = "body"
	ThreadCreatedKey = "time_created"
	ThreadEditedKey  = "time_edited"
)

type Thread struct {
	Id      int    `json:"id"`
	Name    string `json:"author"`
	Title   string `json:"title"`
	Body    string `json:"body"`
	Created string `json:"time_created"`
	Edited  string `json:"time_edited"`
}
