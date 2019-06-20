FROM ubuntu:latest
MAINTAINER liudonghua123 "liudonghua123@gmail.com"

ARG TERM=linux
ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update -y
RUN apt-get install -y python3-pip python3-dev build-essential
COPY ./requirements.txt /app/
WORKDIR /app
RUN pip3 install -r requirements.txt
COPY . /app
ENTRYPOINT ["python3"]
CMD ["app.py"]
