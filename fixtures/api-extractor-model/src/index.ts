import { ApiModel, ApiPackage } from "@microsoft/api-extractor-model";

import data from "./api-json";

const model = new ApiModel();

const apiPackage: ApiPackage = model.loadPackageFromJsonObject(data as any);

console.log(model);
console.log(apiPackage);

// debugger;

// import * as tsdoc from "@microsoft/tsdoc";
// console.log(tsdoc);
