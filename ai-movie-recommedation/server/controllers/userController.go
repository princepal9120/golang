package controllers

import "github.com/gin-gonic/gin"

func GetUsers() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "List of users"})
	}
}

func CreateUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(201, gin.H{"message": "User created successfully"})
	}
}

func GetUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.Param("id")
		c.JSON(200, gin.H{
			"message": "User details",
			"userID":  userID,
		})
	}
}

func UpdateUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.Param("id")
		c.JSON(200, gin.H{
			"message": "User updated successfully",
			"userID":  userID,
		})
	}
}

func DeleteUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.Param("id")
		c.JSON(200, gin.H{
			"message": "User deleted successfully",
			"userID":  userID,
		})
	}
}
