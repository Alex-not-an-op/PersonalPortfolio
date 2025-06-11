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
