// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { describe, it, expect } from "bun:test"
import type { State } from "../../types/state"
import { validateState } from "./validate"

const validState: State = {
    currentPalette: {
        name: "test",
        colors: {
            base00: "000000",
            base01: "111111",
            base02: "222222",
            base03: "333333",
            base04: "444444",
            base05: "555555",
            base06: "666666",
            base07: "777777",
            base08: "888888",
            base09: "999999",
            base0A: "aaaaaa",
            base0B: "bbbbbb",
            base0C: "cccccc",
            base0D: "dddddd",
            base0E: "eeeeee",
            base0F: "ffffff",
        },
    },
    createdAt: new Date().toISOString(),
}

describe("validateState", () => {
    it("returns true for valid state", () => {
        expect(validateState(validState)).toBe(true)
    })

    it("returns false for null", () => {
        expect(validateState(null)).toBe(false)
    })

    it("returns false if createdAt is invalid", () => {
        const invalid = { ...validState, createdAt: "not-a-date" }
        expect(validateState(invalid)).toBe(false)
    })

    it("returns false if palette name is missing", () => {
        const invalid = {
            ...validState,
            currentPalette: {
                ...validState.currentPalette,
                name: 123,
            },
        }
        expect(validateState(invalid)).toBe(false)
    })

    it("returns false if a base16 color is missing", () => {
        const invalid = {
            ...validState,
            currentPalette: {
                ...validState.currentPalette,
                colors: {
                    ...validState.currentPalette.colors,
                    base0F: undefined,
                },
            },
        }
        expect(validateState(invalid)).toBe(false)
    })

    it("returns false if a color is not valid hex", () => {
        const invalid = {
            ...validState,
            currentPalette: {
                ...validState.currentPalette,
                colors: {
                    ...validState.currentPalette.colors,
                    base00: "zzzzzz",
                },
            },
        }

        expect(validateState(invalid)).toBe(false)
    })

    it("returns false if color contains #", () => {
        const invalid = {
            ...validState,
            currentPalette: {
                ...validState.currentPalette,
                colors: {
                    ...validState.currentPalette.colors,
                    base00: "#ffffff",
                },
            },
        }

        expect(validateState(invalid)).toBe(false)
    })

    it("returns false if color length is wrong", () => {
        const invalid = {
            ...validState,
            currentPalette: {
                ...validState.currentPalette,
                colors: {
                    ...validState.currentPalette.colors,
                    base00: "fff",
                },
            },
        }

        expect(validateState(invalid)).toBe(false)
    })
})
