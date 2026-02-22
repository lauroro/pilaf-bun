// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { describe, it, expect } from "bun:test"
import { parsePalette } from "./parse"
import type { Palette } from "../../types/palette"

const name = "test-palette-gruvbox"
const simple = `
# this is a simple palette

base00: "282828"
base01: "3c3836"
base02: "504945"
base03: "665c54"
base04: "bdae93"
base05: "d5c4a1"
base06: "ebdbb2"
base07: "fbf1c7"
base08: "fb4934"
base09: "fe8019"
base0A: "fabd2f"
base0B: "b8bb26"
base0C: "8ec07c"
base0D: "83a598"
base0E: "d3869b"
base0F: "d65d0e"
`

const realistic = `
scheme: "Gruvbox dark, medium"
author: "Dawid Kurek (dawikur@gmail.com), morhetz (https://github.com/morhetz/gruvbox)"
base00: "282828" # ----
base01: "3c3836" # ---
base02: "504945" # --
base03: "665c54" # -
base04: "bdae93" # +
base05: "d5c4a1" # ++
base06: "ebdbb2" # +++
base07: "fbf1c7" # ++++
base08: "fb4934" # red
base09: "fe8019" # orange
base0A: "fabd2f" # yellow
base0B: "b8bb26" # green
base0C: "8ec07c" # aqua/cyan
base0D: "83a598" # blue
base0E: "d3869b" # purple
base0F: "d65d0e" # brown
`

const realisticWithHash = `
# added hash on colors

scheme: "Gruvbox dark, medium"
author: "Dawid Kurek (dawikur@gmail.com), morhetz (https://github.com/morhetz/gruvbox)"
base00: "#282828" # ----
base01: "#3c3836" # ---
base02: "#504945" # --
base03: "#665c54" # -
base04: "#bdae93" # +
base05: "#d5c4a1" # ++
base06: "#ebdbb2" # +++
base07: "#fbf1c7" # ++++
base08: "#fb4934" # red
base09: "#fe8019" # orange
base0A: "#fabd2f" # yellow
base0B: "#b8bb26" # green
base0C: "#8ec07c" # aqua/cyan
base0D: "#83a598" # blue
base0E: "#d3869b" # purple
base0F: "#d65d0e" # brown
`

const expectedPalette: Palette = {
    name,
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

describe("parsePalette", () => {
    it("parse a simple palette", () => {
        expect(parsePalette(name, simple)).toEqual(expectedPalette)
    })

    it("parse a realistic palette", () => {
        expect(parsePalette(name, realistic)).toEqual(expectedPalette)
    })

    it("parse a realistic palette with hash", () => {
        expect(parsePalette(name, realisticWithHash)).toEqual(expectedPalette)
    })
})
