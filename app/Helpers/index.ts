export const isTypeOf = <T>(instance: T): instance is T =>
    Object.keys(instance).every((property) => property in instance);

export const isInstanceOf = <T>(instance: T, properties?: string[]): instance is T =>
    properties ? properties.every((property) => property in instance) : isTypeOf(instance);
