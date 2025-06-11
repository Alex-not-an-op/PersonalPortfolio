export type NumToArray<T extends number, L extends 0[] = []> = T extends L["length"]
    ? L
    : NumToArray<T, [0, ...L]>;

export type Range_rec<From extends 0[], To extends number> = To extends From["length"]
    ? []
    : [From["length"], ...Range_rec<[0, ...From], To>];

//@ts-ignored
export type Range<From extends number, To extends number> = Range_rec<
    NumToArray<From>,
    To
>;

export type Range_union_rec<
    From extends 0[],
    To extends number
> = To extends From["length"]
    ? never
    : From["length"] | Range_union_rec<[0, ...From], To>;

export type Range_union<From extends number, To extends number> = Range_union_rec<
    NumToArray<From>,
    To
>;

/** Returns an Array (not generator) including from and excluding to */
export const range: <From extends number, To extends number>(
    from: From,
    to: To
) => Range<From, To> = (from, to) =>
    [...Array(to - from)].map((_, i) => from + i) as any;

// /** Maps over all Project indices. Callback should return a key, value pair. returns an Object  */
// export const mapRangeToObject: <T, R extends INDEX[]>(
//     range: R,
//     cb: (i: keyof R) => T
// ) => Record<R[INDEX], T> = (range, cb) =>
//     Object.fromEntries(range.map((i) => [i, cb(i)])) as any;

// /** Maps over all project indices. Returns an Object with callback argument i as its keys.*/
// export const mapIndicesToObject: <T>(cb: (i: INDEX) => T) => Record<INDEX, T> = (cb) =>
//     mapRangeToObject(INDICES, cb);