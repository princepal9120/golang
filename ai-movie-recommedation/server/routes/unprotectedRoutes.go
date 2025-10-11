package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/princepal9120/ai-movie-recommedation/server/controllers"
)

func SetupUnProtectedRoutes(router *gin.Engine) {


	router.GET("/movies", controllers.GetMovies())
	router.POST("/register", controllers.RegisterUser())
	router.POST("/login", controllers.LoginUser())
	router.POST("/logout", controllers.LogoutHandler())
	// router.POST("/refresh", controllers.RefreshTokenHandler())
	router.GET("/genres", controllers.GetGenres())

}
