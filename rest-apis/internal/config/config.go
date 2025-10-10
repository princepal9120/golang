package config
import "github.com/ilyakaznacheev/cleanenv"

type HTTPServer struct {
	Addr string `yaml:"address" env-required:true`
}

type Config struct {
	Env     string `yaml:"env" env:"ENV" env-required:true`
	Storage string `yaml:"storage_path" env-required:true`
	HTTPServer `yaml:"http_server" env-required:true`
}
