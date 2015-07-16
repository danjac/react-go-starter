package main

import (
	"flag"
	"net/http"
	"strconv"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

const apiPrefix = "/api/v1"

var (
	dbName = flag.String("db", "/tmp/blog.sqlite", "sqlite database filename")
	env    = flag.String("env", "prod", "environment ('prod' or 'dev')")
)

type Post struct {
	ID    int64  `json:"id"`
	Title string `json:"title"`
}

func main() {

	flag.Parse()

	r := gin.Default()
	r.LoadHTMLGlob("templates/*")
	r.Use(static.Serve("/static", static.LocalFile("static", false)))

	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{
			"env":       *env,
			"apiPrefix": apiPrefix,
		})
	})

	api := r.Group(apiPrefix)

	posts := []*Post{
		&Post{1, "my first post"},
		&Post{2, "my next post"},
	}

	api.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"posts": posts})
	})

	api.GET("/:id", func(c *gin.Context) {

		id, err := strconv.ParseInt(c.Params.ByName("id"), 10, 64)

		if err != nil {
			c.AbortWithError(http.StatusBadRequest, err)
			return
		}

		post := &Post{id, "something"}
		c.JSON(http.StatusOK, post)
	})

	if err := r.Run(":8080"); err != nil {
		panic(err)
	}
}
