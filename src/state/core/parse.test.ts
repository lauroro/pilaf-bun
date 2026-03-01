// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { describe, it, expect } from "bun:test"
import { parseState } from "./parse"
import type { Palette } from "../../types/palette"
import type { State } from "../../types/state"

const state: State = {
    currentPalette: {
        name: "test-palette",
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
    },
    createdAt: new Date().toISOString(),
}

const content = JSON.stringify(state)

describe("parseState", () => {
    it("parses the state correectly", () => {
        expect(parseState(content)).toEqual(state)
    })
})
