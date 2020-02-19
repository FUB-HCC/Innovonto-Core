# Innovonto Core Idea Map Service

## Development
This is a python 3.6 project.
It uses FAST Api as the webserver-framework: https://github.com/tiangolo/fastapi

To setup the project run:

    pip install -r requirements.txt
    uvicorn app.main:app --reload
    
    http://localhost:8000/
    
    
## Production Build
The production build uses: https://github.com/tiangolo/uvicorn-gunicorn-fastapi-docker

    docker build -t idea-map-backend .
    docker run -d --name idea-map-backend-container -p 8000:80 idea-map-backend-container
    
    http://localhost:8000/
    
## Query Examples
To get some ideas that you can cluster, you can use:

    PREFIX gi2mo:<http://purl.org/gi2mo/ns#>

    SELECT ?idea ?content WHERE {
      ?idea a gi2mo:Idea;
            gi2mo:content ?content;
    }
    ORDER BY ?idea
    LIMIT 15
