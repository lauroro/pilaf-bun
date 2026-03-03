// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { describe, it, expect } from "bun:test"
import { validateConfig } from "./validate"

describe("validateConfig", () => {
    it("returns validated config", () => {
        const config = {
            targets: ["a", "b"],
            commands: ["c"],
        }

        expect(validateConfig(config)).toBe(config)
    })

    it("throws if targets missing", () => {
        expect(() => validateConfig({ commands: [] })).toThrow("invalid config")
    })

    it("throws if commands not array", () => {
        expect(() => validateConfig({ targets: [], commands: "nope" })).toThrow(
            "invalid config"
        )
    })

    it("throws if elements are not strings", () => {
        expect(() => validateConfig({ targets: [1], commands: [] })).toThrow(
            "invalid config"
        )
    })
})
