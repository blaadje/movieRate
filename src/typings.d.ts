declare module "*.png" {
  const value: any;
  export = value;
}

declare module "*.jpg" {
  const value: any;
  export = value;
}

declare module "*.svg" {
  const value: any;
  export = value;
}

declare module "react-inlinesvg" {
  const value: any;
  export default value;
}

declare module "react-load-image" {
  const value: any;
  export default value;
}

declare namespace NodeJS {
  export interface Global {
    session: any
  }
}