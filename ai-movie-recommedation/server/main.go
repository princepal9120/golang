
package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/princepal9120/ai-movie-recommedation/server/controllers"
)

func main() {
	// fmt.Println("hello world")
	router := gin.Default()

	router.GET("/hello", func(c *gin.Context) {
		c.String(200, "hello, aimovies!")
	})

	router.GET("/movies", controllers.GetMovies())
	router.GET("/movie/:imdb_id", controllers.GetMovie())
	router.POST("/addmovie", controllers.AddMovie())
	router.POST("/register", controllers.RegisterUser())
	router.POST("/login", controllers.LoginUser())
	router.GET("/getuser", controllers.GetUser())

	if err := router.Run(":8081"); err != nil {
		fmt.Println("Fialed to start server", err)
	}
}
