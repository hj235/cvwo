package router

import (
	"github.com/go-chi/chi/v5"
	"github.com/hj235/cvwo/internal/routes"
)

func Setup() chi.Router {
	router := chi.NewRouter()
	setUpRoutes(router)
	return router
}

func setUpRoutes(router chi.Router) {
	router.Group(routes.GetRoutes())
	router.Route("/user", routes.GetUserRoutes())
}
