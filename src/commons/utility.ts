const generatorInstance = function*(): any {};
function isGenerator(param: any): boolean {
    // @ts-ignore
    return param.constructor === generatorInstance.prototype.constructor;
}

export { isGenerator };
