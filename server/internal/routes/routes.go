package routes

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/hj235/cvwo/internal/handlers/users"
)

func GetRoutes() func(r chi.Router) {
	return func(r chi.Router) {
		r.Get("/users", func(w http.ResponseWriter, req *http.Request) {
			response, _ := users.HandleListAll(w, req)

			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(response)
		})

		r.Post("/signup", func(w http.ResponseWriter, req *http.Request) {
			response, _ := users.HandleSignup(w, req)

			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(response)
		})

		r.Post("/login", func(w http.ResponseWriter, req *http.Request) {
			response, _ := users.HandleLogin(w, req)

			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(response)
		})

		r.Patch("/edit/{username}-{password}", func(w http.ResponseWriter, req *http.Request) {
			response, _ := users.HandleEdit(w, req)

			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(response)
		})

		r.Delete("/delete", func(w http.ResponseWriter, req *http.Request) {
			response, _ := users.HandleDelete(w, req)

			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(response)
		})
	}
}
