# App Architecture

- Architecture overview:
  - Each directory contains three files
    - `name.model.ts`
      - contains models used by the endpoint
    - `name.controller.ts`
      - contains controller pointing to necessary services
        and declaration of request and response types
    - `name.service.ts`
      - contains service which runs the file