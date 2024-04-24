
docker build -f Dockerfile.dev -t my_firstdocker_image . 
docker run -d --name myfirstdockerimage -p 8000:8000 my_firstdocker_image
    docker images