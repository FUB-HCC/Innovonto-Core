# Innovonto Core Idea Map Service

## Development
This is a python 3.6 project.
It uses FAST Api as the webserver-framework: https://github.com/tiangolo/fastapi

To setup the project run:

    pip install -r requirements.txt
    cd app
    uvicorn main:app --reload
    
    http://localhost:8000/
    
    
## Production Build
The production build uses: https://github.com/tiangolo/uvicorn-gunicorn-fastapi-docker

    docker build -t idea-map-backend .
    docker run -d --name idea-map-backend-container -p 8000:80 idea-map-backend
    
    http://localhost:8000/
    
Right now, the idea-map docker container produces an astonishing 3.14 GB image. This could be made better with using alpine.
However, running pip install grpc fails on alpine with: 

    Collecting grpcio==1.27.2 (from -r /tmp/requirements.txt (line 13))
    Downloading https://files.pythonhosted.org/packages/74/52/9204d08bf37ac2505ebab2fa93b808fac87564580d7cc839db2fe11c3bdd/grpcio-1.27.2.tar.gz (16.9MB)
    ERROR: Complete output from command python setup.py egg_info:
    ERROR: Traceback (most recent call last):
      File "<string>", line 1, in <module>
      File "/tmp/pip-install-hsuj9nkv/grpcio/setup.py", line 191, in <module>
        if check_linker_need_libatomic():
      File "/tmp/pip-install-hsuj9nkv/grpcio/setup.py", line 152, in check_linker_need_libatomic
        stderr=PIPE)
      File "/usr/local/lib/python3.7/subprocess.py", line 775, in __init__
        restore_signals, start_new_session)
      File "/usr/local/lib/python3.7/subprocess.py", line 1522, in _execute_child
        raise child_exception_type(errno_num, err_msg, err_filename)
    FileNotFoundError: [Errno 2] No such file or directory: 'cc': 'cc'

Furthermore, numpy, scipy, pandas and tensorflow make various kinds of problems on alpine.

## Query Examples
To get some ideas that you can cluster, you can use:

    PREFIX gi2mo:<http://purl.org/gi2mo/ns#>

    SELECT ?idea ?content WHERE {
      ?idea a gi2mo:Idea;
            gi2mo:content ?content;
    }
    ORDER BY ?idea
    LIMIT 15

IdeaContests:

    1. TCO
    http://purl.org/innovonto/ideaContests/TCO
    
    2. Bionic Radar
    http://purl.org/innovonto/ideaContests/bionic-radar
     
    3. Improve the Environment
    http://purl.org/innovonto/ideaContests/envrionment
    
    4. Mturk Mobile Features
    //TODO