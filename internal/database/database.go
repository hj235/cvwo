package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

type Database struct {
	Database *sql.DB
}

func InitialiseDB() *sql.DB {
	// Verify DSN
	dsn := os.Getenv("MYSQL_DSN")
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		fmt.Println("An error has occurred with the data source name.\nOpening a driver will typically not attempt to connect to the database.")
		log.Fatal(err)
	}

	// Verify Database connection
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
	// Verify Database connection
	err := DBInstance.Database.Ping()
	if err != nil {
		return nil, err
	}
	return &DBInstance, nil
}
