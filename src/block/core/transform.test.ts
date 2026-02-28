// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { describe, it, expect } from "bun:test"
import { transformBlocks } from "./transform"
import type { Palette } from "../../types/palette"
import type { Block } from "../../types/block"

const oldPalette: Palette = {
    name: "old",
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
}

const newPalette: Palette = {
    ...oldPalette,
    name: "new",
    colors: {
        ...oldPalette.colors,
        base00: "abcdef",
    },
}

describe("transformBlocks", () => {
    it("replaces matching colors only", () => {
        const blocks: Block[] = [
            {
                start: 0,
                end: 2,
                content: `
@pilaf:start
color = #000000
@pilaf:end
`.trim(),
            },
            {
                start: 3,
                end: 5,
                content: `
@pilaf:start
color = 000000
@pilaf:end
`.trim(),
            },
            {
                start: 6,
                end: 8,
                content: `
@pilaf:start
color = 000000ff
@pilaf:end
`.trim(),
            },
            {
                start: 9,
                end: 11,
                content: `
@pilaf:start
color = 0x000000
@pilaf:end
`.trim(),
            },
        ]

        const result = transformBlocks(blocks, oldPalette, newPalette)

        expect(result[0]!.content).toContain("#abcdef")
        expect(result[1]!.content).toContain("abcdef")
        expect(result[2]!.content).toContain("abcdefff")
        expect(result[3]!.content).toContain("0xabcdef")
    })

    it("does not replace unknown colors", () => {
        const blocks: Block[] = [
            {
                start: 0,
                end: 2,
                content: `
@pilaf:start
color = #123456
@pilaf:end
`.trim(),
            },
        ]

        const result = transformBlocks(blocks, oldPalette, newPalette)

        expect(result[0]!.content).toContain("#123456")
    })
})
