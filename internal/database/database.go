package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

type Database struct {
	db *sql.DB
}

func InitialiseDB() *sql.DB {
	pwd := os.Getenv("MYSQL_PWD")
	db, err := sql.Open("mysql", "root:"+pwd+"@tcp(localhost:3306)/webforum")
	if err != nil {
		fmt.Println("An error has occurred with the data source name.\nOpening a driver will typically not attempt to connect to the database.")
		log.Fatal(err)
	}

	err = db.Ping()
	if err != nil {
		fmt.Println("An error has occurred connecting to the database with the given DSN.")
		log.Fatal(err)
	}

	fmt.Println("Successfully connected to database.")

	return db
}

var DBInstance Database = Database{InitialiseDB()}

func GetDB() (*Database, error) {

	return &DBInstance, nil
}
