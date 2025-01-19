package routes

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/hj235/cvwo/internal/handlers/users"
)

func GetUserRoutes() func(router chi.Router) {
	return func(router chi.Router) {
		router.Use()

		router.Get("/", func(w http.ResponseWriter, req *http.Request) {
			response, _ := users.HandleListAll(w, req)

			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(response)
		})

		router.Post("/signup", func(w http.ResponseWriter, req *http.Request) {
			response, _ := users.HandleSignup(w, req)

			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(response)
		})

		router.Post("/login", func(w http.ResponseWriter, req *http.Request) {
			response, _ := users.HandleLogin(w, req)

			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(response)
		})
	}
}
