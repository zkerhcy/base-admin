VERSION=1.0.0

install:
	npm install

test:
	npm run lint

pull:
	git pull

build: pull
	npm run build

package: build
	rm -rf dist.zip
	zip dist.zip -r dist

clean:
	rm -rf dist dist*.zip
	
zip:
	zip dist.zip -r dist