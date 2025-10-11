package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/princepal9120/ai-movie-recommedation/server/controllers"
	"github.com/princepal9120/ai-movie-recommedation/server/middleware"
)

func SetupProtectedRoutes(router *gin.Engine) {
	router.Use(middleware.AuthMiddleWare())
	router.GET("/movie/:imdb_id", controllers.GetMovie())
	router.POST("/addmovie", controllers.AddMovie())
	router.GET("/recommendedmovies", controllers.GetRecommendedMovies())
	router.PATCH("/updatereview/:imdb_id", controllers.AdminReviewUpdate())

}
