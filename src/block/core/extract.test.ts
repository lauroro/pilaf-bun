// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { describe, it, expect } from "bun:test"
import { extractBlocks } from "./extract"

const sampleFile = `
line 0
@pilaf:start
color = #111111
color2 = #222222
@pilaf:end
line after
@pilaf:start
color = #333333
@pilaf:end
`.trim()

describe("extractBlocks", () => {
    it("extracts multiple blocks with line indices", () => {
        const blocks = extractBlocks(sampleFile)
        expect(blocks.length).toBe(2)
        expect(blocks[0]).toEqual({
            start: 1,
            end: 4,
            content: `
@pilaf:start
color = #111111
color2 = #222222
@pilaf:end`,
        })
        expect(blocks[1]).toEqual({
            start: 6,
            end: 8,
            content: `
@pilaf:start
color = #333333
@pilaf:end`,
        })
    })

    it("throws on unclosed start", () => {
        const bad = "@pilaf:start\ncolor = #000000"
        expect(() => extractBlocks(bad)).toThrow()
    })

    it("throws on orphan end", () => {
        const bad = "color = #000000\n@pilaf:end"
        expect(() => extractBlocks(bad)).toThrow()
    })
})
