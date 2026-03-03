// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { describe, it, expect } from "bun:test"
import { isHexColor } from "./is-hex-color"

describe("isHexColor", () => {
    describe("valid hex colors", () => {
        it("accepts lowercase hex", () => {
            expect(isHexColor("ffffff")).toBe(true)
            expect(isHexColor("000000")).toBe(true)
            expect(isHexColor("abc123")).toBe(true)
        })

        it("accepts uppercase hex", () => {
            expect(isHexColor("FFFFFF")).toBe(true)
            expect(isHexColor("ABC123")).toBe(true)
        })

        it("accepts mixed case hex", () => {
            expect(isHexColor("AbC123")).toBe(true)
        })
    })

    describe("invalid hex colors", () => {
        it("rejects strings with # prefix", () => {
            expect(isHexColor("#ffffff")).toBe(false)
        })

        it("rejects strings with wrong length", () => {
            expect(isHexColor("fff")).toBe(false)
            expect(isHexColor("fffff")).toBe(false)
            expect(isHexColor("fffffff")).toBe(false)
        })

        it("rejects non-hex characters", () => {
            expect(isHexColor("zzzzzz")).toBe(false)
            expect(isHexColor("12345g")).toBe(false)
            expect(isHexColor("hello!")).toBe(false)
        })

        it("rejects non-string values", () => {
            expect(isHexColor(null)).toBe(false)
            expect(isHexColor(undefined)).toBe(false)
            expect(isHexColor(123456)).toBe(false)
            expect(isHexColor({})).toBe(false)
            expect(isHexColor([])).toBe(false)
        })
    })
})
