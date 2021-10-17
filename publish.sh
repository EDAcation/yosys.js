#!/bin/bash

cd yosys

UPSTREAM_COMMIT=$(git log --format="%H" -n 1)
UPSTREAM_VERSION=$(
    git describe --tags $(git rev-list --tags --max-count=1) \
    | cut -c 7-
)
UPSTREAM_MAJOR=$(echo $UPSTREAM_VERSION | cut -d '.' -f 1)
UPSTREAM_MINOR=$(echo $UPSTREAM_VERSION | cut -d '.' -f 2)

cd ..

VERSION=$(cat package.json \
    | grep version \
    | tail -1 \
    | awk -F: '{ print $2 }' \
    | sed 's/[",]//g')
MAJOR=$(echo $VERSION | cut -d '.' -f 1)
MINOR=$(echo $VERSION | cut -d '.' -f 2)

if (( $MAJOR < $UPSTREAM_MAJOR )) || (( $MINOR < $UPSTREAM_MINOR )); then
    yarn publish --no-git-tag-version --new-version "$UPSTREAM_VERSION.0"
else
    yarn publish --no-git-tag-version --patch
fi

NEW_VERSION=$(cat package.json \
    | grep version \
    | tail -1 \
    | awk -F: '{ print $2 }' \
    | sed 's/[",]//g')

echo "UPSTREAM_COMMIT=$UPSTREAM_COMMIT" >> $GITHUB_ENV
echo "NEW_VERSION=$NEW_VERSION" >> $GITHUB_ENV
