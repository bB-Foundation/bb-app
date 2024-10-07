export type Nullable<T> = T | null;

export type OmitSafe<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
