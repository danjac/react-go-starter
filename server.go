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
	ID    int64  `json:"id" binding:"-"`
	Title string `json:"title" binding:"required"`
	Text  string `json:"text" binding:"required"`
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
		&Post{1, "my first post", "hello"},
		&Post{2, "my next post", "hello again"},
	}

	api.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"posts": posts})
	})

	api.POST("/", func(c *gin.Context) {
		post := &Post{}
		if err := c.BindJSON(post); err != nil {
			c.AbortWithError(http.StatusBadRequest, err)
			return
		}
		post.ID = int64(len(posts) + 1)
		posts = append(posts, post)
		c.JSON(http.StatusOK, post)

	})

	api.GET("/:id", func(c *gin.Context) {

		id, err := strconv.ParseInt(c.Params.ByName("id"), 10, 64)

		if err != nil {
			c.AbortWithError(http.StatusBadRequest, err)
			return
		}

		for _, post := range posts {
			if post.ID == id {
				c.JSON(http.StatusOK, post)
				return
			}
		}

		c.String(http.StatusNotFound, "No post found")
	})

	if err := r.Run(":8080"); err != nil {
		panic(err)
	}
}
