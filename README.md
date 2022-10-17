# Notary Sign Action
A GitHub action for digitally signing container images hosted on an OCI-conformant registry with [Notary](https://github.com/notaryproject/notary).

## Usage

Sign an image:

```yml
name: ci

on: [push]

jobs:
  sign_container_image:
    runs-on: ubuntu-latest
    name: Notation sign container image
    steps:
      - uses: notary-sign-action@v0.1.0
      - name: Sign container image
        with:
          image-name: 'registry/image:tag'
```

Sign an image with a password protected registry:

```yml
name: ci

on: [push]

jobs:
  sign_container_image:
    runs-on: ubuntu-latest
    name: Notation sign container image
    steps:
      - uses: notary-sign-action@v0.1.0
      - name: Sign container image
        env:
          NOTATION_USERNAME: ${{ secrets.NOTATION_USERNAME }}
          NOTATION_PASSWORD: ${{ secrets.NOTATION_PASSWORD }}
        with:
          image-name: 'registry/image:tag'
```

Sign an image hosted on Azure Container Registry (ACR):

```yml
name: ci

on: [push]

jobs:
  sign_container_image:
    runs-on: ubuntu-latest
    name: Notation sign container image
    steps:
      - uses: notary-sign-action@v0.1.0
      - name: Sign container image
        env:
          AZURE_TENANT_ID: ${{ secrets.AZURE_TENANT_ID }}
          AZURE_CLIENT_ID: ${{ secrets.AZURE_CLIENT_ID}}
          AZURE_CLIENT_SECRET: ${{ secrets.AZURE_CLIENT_SECRET }}
          NOTATION_USERNAME: ${{ secrets.NOTATION_USERNAME }}
          NOTATION_PASSWORD: ${{ secrets.NOTATION_PASSWORD }}
        with:
          image-name: 'registry/image:tag'
```

## Inputs

| Name     | type     | description                                     | required | default                  |
| -------- | -------- | ----------------------------------------------- | -------- | ------------------------ |
| image-name | string   | The full name of the container image (registry/image-name:tag)| true    |  |

> **IMPORTANT**
> The Notary Sign Action assumes the Notation CLI is installed. To add the Notation CLI to your runner, use the [setup-notation](https://github.com/Duffney/setup-notation) action.


## Required Environment Variables

### Basic authentication

Signing images hosted on a remote registry with basic auth enabled requires the following environment variables.

Name | Description |
---------|----------|
 NOTATION_USERNAME | Name of user accessing the remote registry |
 NOTATION_PASSWORD | Password of the user accessing the remote registry |

### Azure Container Registry authentication

To remotely sign container images hosted on Azure Container Registry the [Azure provider](https://github.com/Azure/notation-azure-kv) for Notary v2 [Notation](https://github.com/notaryproject/notation) requires the following environment variables.

Name | Description |
---------|----------|
 AZURE_TENANT_ID | Tenant id of the service principal | 
 AZURE_CLIENT_ID | Client id of the service principal  | 
 AZURE_CLIENT_SECRET | Password value of the of the service principal | 
 NOTATION_USERNAME | Name of user accessing the remote registry |
 NOTATION_PASSWORD | Password of the user accessing the remote registry |

> NOTE: 
> To secure these values in your CI pipeline store them as [GitHub Action Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository).


