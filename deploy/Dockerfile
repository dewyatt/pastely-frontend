FROM alpine:3.4
MAINTAINER Daniel Wyatt <Daniel.Wyatt@gmail.com>
LABEL Description="Pastely Frontend - Alpine Base" Version="1.0"

ARG deploy_environment
ARG git_sha1
ARG server_name

# Bootstrap by installing ansible
RUN apk add --no-cache ansible

# Run our playbook
COPY ansible /tmp/deploy
WORKDIR /tmp/deploy
RUN ansible-playbook --connection=local                                          \
                     --extra-vars="deploy_environment=$deploy_environment git_sha1=$git_sha1 server_name=$server_name"  \
                     -i localhost,                                               \
                     site.yaml                                                   \
                     -vv

WORKDIR /etc/nginx
CMD ["nginx"]
EXPOSE 80
