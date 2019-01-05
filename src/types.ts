export type StringOrNumber = String | Number

export type OneOrManyObjects = Object | Object[]

export type Deconstructed = { [ key : string ] : StringOrNumber }

export type Model = { id: StringOrNumber }
