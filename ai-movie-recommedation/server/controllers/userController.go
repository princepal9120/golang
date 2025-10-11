package controllers

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/princepal9120/ai-movie-recommedation/server/database"
	"github.com/princepal9120/ai-movie-recommedation/server/models"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"golang.org/x/crypto/bcrypt"
)
var userCollection *mongo.Collection= database.OpenCollection("users")

func HashPassword(password string) (string, error) {
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil { 
		return "", err
	}
	return string(hashPassword), nil
}

func RegisterUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		var user models.User

		if err := c.ShouldBindBodyWithJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input data"})
			return
		}
		validate = validator.New()
		if err := validate.Struct(user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Validation Failed", "details": err.Error()})
			return
		}
		hashedPassword, err := HashPassword(user.Password)
		if err!= nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "unable to hash password"})
			return
		}
		var ctx, cancel = context.WithTimeout(c, 100*time.Second)
		defer cancel()

		count, err := userCollection.CountDocuments(ctx, bson.M{"email" : user.Email}) 
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to check existing user" })
			return 
		}
		 if count> 0 {
			c.JSON(http.StatusConflict, gin.H{"error": "user already exist"})
			 
		 } 
		 user.UserID =bson.NewObjectID().Hex()
		 user.CreatedAt =time.Now()
		 user.UpdatedAt= time.Now()
		 user.Password=hashedPassword

		 result , err := userCollection.InsertOne(ctx, user)
		 if err !=nil {
			c.JSON(http.StatusInternalServerError, gin.H("error": "Failed to create user")
		)
		c.JSON(http.StatusOK, result)
		 }
	}
}
func LoginUser() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var userLogin models.UserLogin

		if err := c.ShouldBindBodyWithJSON(&userLogin); err!= nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input data"})
			return
		}
		var ctx, cancel =context.WithTimeout(c, 100*time.Second)
		defer cancel()


		var foundUser models.User
		err := userCollection.FindOne(ctx, bson.M{"email": userLogin.Email}).Decode(&foundUser)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid email or password"} )
		}
		err = bcrypt.CompareHashAndPassword([]byte(foundUser.Password),[]byte(userLogin.Password ))
		if err!= nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid email or password"} )
		}

		 
	}
}

func GetUsers() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "List of users"})
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
