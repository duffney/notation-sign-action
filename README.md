# Notary Sign Action
A GitHub action for digitally signing container images hosted on Azure Container Registry with [Notary](https://github.com/notaryproject/notary).


## Usage

```yml
name: ci

on: [push]

jobs:
  sign_container_image:
    runs-on: ubuntu-latest
    name: Notation sign container image
    steps:
      - uses: actions/checkout@v3
      - name: Run notation action
        env:
          AZURE_TENANT_ID: ${{ secrets.AZURE_TENANT_ID }}
          AZURE_CLIENT_ID: ${{ secrets.AZURE_CLIENT_ID}}
          AZURE_CLIENT_SECRET: ${{ secrets.AZURE_CLIENT_SECRET }}
          NOTATION_USERNAME: ${{ secrets.NOTATION_USERNAME }}
          NOTATION_PASSWORD: ${{ secrets.NOTATION_PASSWORD }}
        uses: notary-sign-action@v0.1.0
        with:
          certificate-name: ''
          key-identifier: ''
          certificate-identifer: ''
          image-name: 'registry/image:tag'
        id: notation
```

## Required Environment Variables

To remotely sign container images hosted on Azure Container Registry the [Azure provider](https://github.com/Azure/notation-azure-kv) for Notary v2 [Notation](https://github.com/notaryproject/notation) requires the following environment variables.

Column A | Column B |
---------|----------|
 AZURE_TENANT_ID | Tenant id of the service principal | 
 AZURE_CLIENT_ID | Client id of the service principal  | 
 AZURE_CLIENT_SECRET | Password value of the of the service principal | 
 NOTATION_USERNAME | Name of the Azure Container Registry token |
 NOTATION_PASSWORD | Password value of the Azure Container Registry token |

> NOTE: 
> To secure these values in your CI pipeline store them as [GitHub Action Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository).

## Required Inputs

| Name     | type     | description                                     | required | default                  |
| -------- | -------- | ----------------------------------------------- | -------- | ------------------------ |
| certificate-name | string   | The name of the certificate to sign the images  | true     |                          |
| key-identifier | string | The key identifier url of the certificate | true     |                          |
| certificate-identifer | string   | The certificate identifier url of the certificate | true     |                          |
| image-name | string   | The full name of the container image (registry/image-name:tag)| true    |  |

