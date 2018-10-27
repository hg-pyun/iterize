const generatorInstance = function*(): any {};
function isGenerator(param: any): boolean {
    return param.constructor === generatorInstance.prototype.constructor;
}

export { isGenerator };
