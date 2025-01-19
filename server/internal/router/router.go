package router

import (
	"github.com/go-chi/chi/v5"
	"github.com/hj235/go-app/internal/routes"
)

func Setup() chi.Router {
	r := chi.NewRouter()
	setUpRoutes(r)
	return r
}

func setUpRoutes(r chi.Router) {
	r.Group(routes.GetRoutes())
}
