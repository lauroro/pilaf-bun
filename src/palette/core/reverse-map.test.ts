// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { describe, it, expect } from "bun:test"
import type { Palette } from "../../types/palette"
import { buildReverseMap } from "./reverse-map"

const palette: Palette = {
    name: "test",
    colors: {
        base00: "282828",
        base01: "3c3836",
        base02: "504945",
        base03: "665c54",
        base04: "bdae93",
        base05: "d5c4a1",
        base06: "ebdbb2",
        base07: "fbf1c7",
        base08: "fb4934",
        base09: "fe8019",
        base0A: "fabd2f",
        base0B: "b8bb26",
        base0C: "8ec07c",
        base0D: "83a598",
        base0E: "d3869b",
        base0F: "d65d0e",
    },
}

describe("buildReverseMap", () => {
    it("maps color to correct base key", () => {
        const map = buildReverseMap(palette)

        expect(map.get("282828")).toBe("base00")
        expect(map.get("d5c4a1")).toBe("base05")
    })

    it("normalizes colors to lowercase", () => {
        const upperPalette: Palette = {
            ...palette,
            colors: {
                ...palette.colors,
                base00: "ABCDEF",
            },
        }

        const map = buildReverseMap(upperPalette)

        expect(map.get("abcdef")).toBe("base00")
    })

    it("returns undefined for unknown colors", () => {
        const map = buildReverseMap(palette)

        expect(map.get("ffffff")).toBeUndefined()
    })
})
