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
type UnaryFn<I = any, O = any> = (input: I) => O | Promise<O>

/*
 * AsyncPipeResult computes the resulting function type of an async pipe.
 *
 * Fns is a tuple (readonly array) of unary functions (can return Promises).
 *
 * The resulting type is always a Promise of the final output.
 */
type AsyncPipeResult<Fns extends readonly UnaryFn[]> = Fns extends readonly [
    (input: infer A) => infer B | Promise<infer B>,
]
    ? (input: A) => Promise<B>
    : Fns extends readonly [(input: infer A) => any, ...infer Rest]
      ? Rest extends readonly UnaryFn[]
          ? (input: A) => Promise<Awaited<ReturnType<AsyncPipeResult<Rest>>>>
          : never
      : never

/**
 * Compose unary functions left-to-right, supporting async functions.
 *
 * asyncPipe(f, g, h)(x) === await h(await g(await f(x)))
 *
 * All functions can be sync or async.
 */
export const asyncPipe = <const Fns extends readonly UnaryFn[]>(
    ...fns: Fns
): AsyncPipeResult<Fns> => {
    return (async (input: unknown) => {
        let acc: any = input
        for (const fn of fns) {
            acc = await fn(acc)
        }
        return acc
    }) as AsyncPipeResult<Fns>
}
