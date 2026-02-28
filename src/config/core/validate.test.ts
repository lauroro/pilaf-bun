// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { describe, it, expect } from "bun:test"
import { validateConfig } from "./validate"

describe("validateConfig", () => {
    it("returns true for valid config", () => {
        const config = {
            targets: ["a", "b"],
            commands: ["c"],
        }
        expect(validateConfig(config)).toBe(true)
    })

    it("returns false if targets missing", () => {
        expect(validateConfig({ commands: [] })).toBe(false)
    })

    it("returns false if commands not array", () => {
        expect(validateConfig({ targets: [], commands: "nope" })).toBe(false)
    })

    it("returns false if elements are not strings", () => {
        expect(validateConfig({ targets: [1], commands: [] })).toBe(false)
    })
})
