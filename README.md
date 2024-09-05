## `@kepler16/setup-kmono`

This is a github action for setting up [the kmono cli](https://github.com/kepler16/kmono).

```yaml
name: Workflow

on:
  push:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout git repo
      uses: actions/checkout@v4

    - name: Setup Kmono
      uses: kepler16/setup-kmono@v1
      with:
        version: latest
```
