// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { describe, it, expect } from "bun:test"
import { asyncPipe } from "./async-pipe"

describe("asyncPipe", () => {
    it("works with synchronous functions", async () => {
        const fn = asyncPipe(
            (n: number) => n + 1,
            (n) => n * 2,
            (n) => n - 3
        )

        const result = await fn(4) // ((4+1)*2)-3 = 7
        expect(result).toBe(7)
    })

    it("works with asynchronous functions", async () => {
        const fn = asyncPipe(
            async (n: number) => n + 1,
            async (n) => n * 2,
            async (n) => n - 3
        )

        const result = await fn(4) // ((4+1)*2)-3 = 7
        expect(result).toBe(7)
    })

    it("works with mixed sync and async functions", async () => {
        const fn = asyncPipe(
            (n: number) => n + 1,
            async (n) => n * 2,
            (n) => n - 3
        )

        const result = await fn(4)
        expect(result).toBe(7)
    })

    it("infers types correctly", async () => {
        const fn = asyncPipe(
            (s: string) => s.length,
            async (n: number) => n * 2
        )

        const result: number = await fn("hello")
        expect(result).toBe(10)
    })
})
