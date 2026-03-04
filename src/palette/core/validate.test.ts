// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { describe, it, expect } from "bun:test"
import type { Palette } from "../../types/palette"
import { validatePalette } from "./validate"

const validPalette: Palette = {
    name: "valid",
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
        base0A: "AAAAAA",
        base0B: "BBBBBB",
        base0C: "CCCCCC",
        base0D: "DDDDDD",
        base0E: "EEEEEE",
        base0F: "FFFFFF",
    },
}

const missingBasePalette: Palette = {
    name: "missingBase",
    colors: {
        base00: "000000",
        base01: "111111",
        base02: "222222",
        // base03 is missing
        base04: "444444",
        base05: "555555",
        base06: "666666",
        base07: "777777",
        base08: "888888",
        base09: "999999",
        base0A: "AAAAAA",
        base0B: "BBBBBB",
        base0C: "CCCCCC",
        base0D: "DDDDDD",
        base0E: "EEEEEE",
        base0F: "FFFFFF",
    } as any,
}

const duplicatePalette: Palette = {
    name: "duplicate",
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
        base0A: "AAAAAA",
        base0B: "BBBBBB",
        base0C: "CCCCCC",
        base0D: "DDDDDD",
        base0E: "EEEEEE",
        base0F: "000000", // duplicate of base00
    },
}

const invalidHexPalette: Palette = {
    name: "invalidHex",
    colors: {
        base00: "000000",
        base01: "111111",
        base02: "222222",
        base03: "333333",
        base04: "GGGGGG", // not a valid HEX
        base05: "555555",
        base06: "666666",
        base07: "777777",
        base08: "888888",
        base09: "999999",
        base0A: "AAAAAA",
        base0B: "BBBBBB",
        base0C: "CCCCCC",
        base0D: "DDDDDD",
        base0E: "EEEEEE",
        base0F: "FFFFFF",
    },
}

describe("validatePalette", () => {
    it("valid palette passes", () => {
        expect(validatePalette(validPalette)).toBe(validPalette)
    })

    it("palette missing a base fails", () => {
        expect(() => validatePalette(missingBasePalette)).toThrow(
            "invalid palette"
        )
    })

    it("palette with duplicate colors fails", () => {
        expect(() => validatePalette(duplicatePalette)).toThrow(
            "invalid palette"
        )
    })

    it("palette with invalid hex fails", () => {
        expect(() => validatePalette(invalidHexPalette)).toThrow(
            "invalid palette"
        )
    })
})
