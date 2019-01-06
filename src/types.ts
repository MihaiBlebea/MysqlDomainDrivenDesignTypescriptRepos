export type StringOrNumber = String | Number

export type Deconstructed = {
    id: StringOrNumber,
    [ key : string ] : StringOrNumber
}
