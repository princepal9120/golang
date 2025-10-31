package main

import (
	"context"
	"fmt"
	"log"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/princepal9120/rest-apis/internal/config"
)

func main() {
	//load config
	cfg := config.MustLoad()

	//database setup

	//setup router
	router := http.NewServeMux()
	router.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("welcome to rest apis"))
	})

	//setup server
	server := http.Server{
		Addr:    cfg.Addr,
		Handler: router,
	}
	fmt.Printf("server started %s\n", cfg.HTTPServer.Addr)
	done := make(chan os.Signal, 1)
	signal.Notify(done, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)

	// Wait for interrupt signal to gracefully shutdown the server
	go func() {
		err := server.ListenAndServe()

		if err != nil {
			log.Fatalf("server not started: %s", err.Error())
		}
	}()
	<-done


	slog.Info("server stopped")


	ctx,cancel:=context.WithTimeout(context.Background(),5*time.Second)
	defer cancel()
	err:=server.Shutdown(ctx)
	if err!=nil {
		slog.Error("server shutdown failed:", slog.String("error", err.Error()))
	}
	slog.Info("server exited properly")
}
