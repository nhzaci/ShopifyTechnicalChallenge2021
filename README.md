# Shopify Technical Challenge

## Local Setup

1. Install `nvm` node version manager to install node js and npm, [instructions here](https://github.com/nvm-sh/nvm#installing-and-updating)

- In your terminal: run these two lines:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

2. Install node v15.11.0 with nvm

```bash
nvm install 15.11.0
```

3. Use node v15.11.0 in nvm

```bash
nvm use 15.11.0
```

4. Install yarn globally with npm

```bash
sudo npm i -g yarn
```

5. Install dependencies with yarn

```sh
yarn
```

6. Starting dev server

```sh
yarn dev
```

7. Swagger documentation endpoint `docs/` for swagger ui with playground and API documentation
