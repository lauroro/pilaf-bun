// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { describe, it, expect } from "bun:test"
import { normalizePalette } from "./normalize"
import type { Palette } from "../../types/palette"

const rawPalette: Palette = {
    name: "test",
    colors: {
        base00: "#282828",
        base01: "3C3836",
        base02: "##504945",
        base03: "#665c54",
        base04: "BDAE93",
        base05: "#D5C4A1",
        base06: "EBDBB2",
        base07: "#FBF1C7",
        base08: "FB4934",
        base09: "#FE8019",
        base0A: "FABD2F",
        base0B: "#B8BB26",
        base0C: "8EC07C",
        base0D: "#83A598",
        base0E: "D3869B",
        base0F: "#D65D0E",
    },
}

describe("normalizePalette", () => {
    it("removes leading # characters", () => {
        const normalized = normalizePalette(rawPalette)

        expect(normalized.colors.base00).toBe("282828")
        expect(normalized.colors.base02).toBe("504945")
    })

    it("converts all colors to lowercase", () => {
        const normalized = normalizePalette(rawPalette)

        expect(normalized.colors.base01).toBe("3c3836")
        expect(normalized.colors.base04).toBe("bdae93")
        expect(normalized.colors.base0A).toBe("fabd2f")
    })

    it("does not modify the palette name", () => {
        const normalized = normalizePalette(rawPalette)

        expect(normalized.name).toBe("test")
    })

    it("returns a new object (immutability)", () => {
        const normalized = normalizePalette(rawPalette)

        expect(normalized).not.toBe(rawPalette)
        expect(normalized.colors).not.toBe(rawPalette.colors)
    })

    it("keeps already normalized colors unchanged", () => {
        const cleanPalette = normalizePalette(rawPalette)
        const normalizedAgain = normalizePalette(cleanPalette)

        expect(normalizedAgain).toEqual(cleanPalette)
    })
})
