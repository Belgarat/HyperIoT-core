# HyperiotCore

Hyperiot-core project includes HyperIotCore library.

HyperIotCore library includes the client SDK for consuming hyperiot services and other utility services (e.g. logger).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli).

---

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Building @hyperiot/core library

Run `ng build core` to build the library. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

---
## Client SDK generation (WIP)

>Important: This procedure is a work in progress and it should be considered unstable. Depending on the operating system you are using, modifications to the acsgen.sh may be required. This procedure and acsgen.sh  will be updated in a future release.

This procedure outlines how to automatically generate hyperiot services client sdk.

1. Install Swagger (https://github.com/swagger-api/swagger-codegen) and move swagger-codegen-cli.jar in 'generator' folder.
2. Setting config file: you have to set which swagger documentation you want to use (default is docTest).
3. Run 'acsgen.sh' in 'generator' folder.

---
## License

Apache 2.0 License (click [here](./License.MD) to see license information)