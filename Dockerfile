FROM ubuntu:latest
LABEL authors="connoroshaughnessy"

ENTRYPOINT ["top", "-b"]