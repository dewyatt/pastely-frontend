#!/bin/bash
set -e -u

deploy_environment="$1"
git_sha1="$2"
tag="gcr.io/pastely-1357/pastely-frontend:${git_sha1}.${deploy_environment}.v${BUILD_NUMBER}"
server_name="$3"

cd deploy

docker build \
    --build-arg=deploy_environment="$deploy_environment" \
    --build-arg=git_sha1="$git_sha1" \
    --build-arg=server_name="$server_name" \
    -t "$tag" .
