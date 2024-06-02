
docker build -f Dockerfile.dev -t todo_api . 
docker run -d --name todoapi -p 8000:8000 todo_api 
    docker images