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

	if err := router.Run(":8080"); err != nil {
		fmt.Println("Fialed to start server", err)
	}
}
