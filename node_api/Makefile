all: clean

clean: 
	find . -name '*.log' -type f -exec rm -f {} \; 

run:
	node index.js

docker-build: 
	docker build -t nodejs .
	docker images

docker-clean:
	docker stop nodejs
	docker rm nodejs