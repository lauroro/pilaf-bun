// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

/*
 * An unary function is a function with exactly one input parameter.
 *
 * I = input type  (default: any)
 * O = output type (default: any)
 *
 * It defaults to `any` so that the generic can be inferred automatically
 * when used inside tuple constraints.
 */
type UnaryFn<I = any, O = any> = (input: I) => O

/*
 * PipeResult computes the resulting function type of a pipe.
 *
 * Fns is a tuple (readonly array) of unary functions.
 *
 * The goal is:
 *   pipe(f, g, h)
 * to be typed as:
 *   (input: InputOfFirstFn) => OutputOfLastFn
 */
type PipeResult<Fns extends readonly UnaryFn[]> =
    /*
     * Base case:
     * If the tuple has exactly one function:
     *   [(input: A) => B]
     * then the resulting pipe type is:
     *   (input: A) => B
     *
     * It uses 'infer' to extract A (input type) and B (output type).
     */
    Fns extends readonly [(input: infer A) => infer B]
        ? (input: A) => B
        : /*
           * Recursive case:
           * If the tuple has at least one function:
           *   [(input: A) => any, ...Rest]
           * then:
           *   - infer the input type A from the first funtion
           *   - capture the remaining functions in 'Rest'
           *
           * Then recursively compute the pipe type of 'Rest'
           * and use its ReturnType as the final output type.
           */
          Fns extends readonly [(input: infer A) => any, ...infer Rest]
          ? Rest extends readonly UnaryFn[]
              ? (input: A) => ReturnType<PipeResult<Rest>>
              : never
          : /*
             * Fallback case:
             * If Fns does not match the expected structure,
             * the pipe is considered invalid.
             */
            never

/**
 * Compose unary functions left-to-right.
 *
 * pipe(f, g, h)(x) === h(g(f(x)))
 *
 * Example:
 *
 *   const fn = pipe(
 *     (n: number) => n.toString(),
 *     (s: string) => s.length
 *   )
 *
 *   // fn is typed as:
 *   // (input: number) => number
 *
 * Runtime behavior:
 * - The first function receives the original input.
 * - Each subsequent function receives the previous output.
 */
export const pipe = <const Fns extends readonly UnaryFn[]>(
    ...fns: Fns
): PipeResult<Fns> => {
    return ((input: unknown) =>
        fns.reduce((acc, fn) => fn(acc), input)) as PipeResult<Fns>
}
