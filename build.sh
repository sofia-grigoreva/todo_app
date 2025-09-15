#!/bin/bash
mkdir -p public/build
handlebars -m public/src/components/header/header.hbs -f public/build/header.js
handlebars -m public/src/components/posts/posts.hbs -f public/build/posts.js
handlebars -m public/src/components/post/post.hbs -f public/build/post.js
