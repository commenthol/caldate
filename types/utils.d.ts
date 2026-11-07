/**
 * @param {unknown} arg
 * @returns {arg is object}
 */
export declare function isObject(arg: unknown): arg is object;
/**
 * @param {unknown} value
 * @returns {value is Date}
 */
export declare function isDate(value: unknown): value is Date;
/**
 * pad number with `0`
 * @param {number} number
 * @param {number} [len=2] - desired output length
 * @returns {string} padded string
 */
export declare function pad0(number: number, len?: number): string;
/**
 * Convert a value to an integer.
 * @private
 * @param {number|string|null|undefined} str
 * @returns {number|undefined} converted number or undefined
 */
export declare function toNumber(str: number | string | null | undefined): number | undefined;
/**
 * extract or set year
 * @private
 * @param {number|string|Date|null} [year]
 * @returns {number|undefined} year
 */
export declare function toYear(year?: number | string | Date | null): number | undefined;
