// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { describe, it, expect } from "bun:test"
import { pipe } from "./pipe"

describe("pipe (sync)", () => {
    it("composes two functions", () => {
        const fn = pipe(
            (n: number) => n + 2,
            (n) => n * 3
        )

        const result = fn(4) // (4+2)*3 = 18
        expect(result).toBe(18)
    })

    it("composes three functions", () => {
        const fn = pipe(
            (n: number) => n + 1,
            (n) => n * 2,
            (n) => n - 3
        )

        const result = fn(4) // ((4+1)*2)-3 = 7
        expect(result).toBe(7)
    })

    it("passes strings correctly", () => {
        const fn = pipe(
            (s: string) => s.trim(),
            (s) => s.toUpperCase(),
            (s) => s + "!"
        )

        const result = fn("  hello ")
        expect(result).toBe("HELLO!")
    })

    it("infers types correctly", () => {
        const fn = pipe(
            (s: string) => s.length,
            (n: number) => n * 2
        )

        const result: number = fn("abc")
        expect(result).toBe(6)
    })

    it("works with identity function", () => {
        const fn = pipe((x: number) => x)
        const result = fn(42)
        expect(result).toBe(42)
    })
})
