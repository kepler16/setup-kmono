default:
  @just --list

build:
  pnpm tsc -b

compile: build
  pnpm ncc build dist/index.js -o release -m

run: build
  RUNNER_TEMP=$TMPDIR node ./dist/index.js
