// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { describe, it, expect } from "bun:test"
import { rebuildFile } from "./rebuild"
import type { Block } from "../../types/block"

const file = `
line 0
@pilaf:start
color = #000000
@pilaf:end
line after
`.trim()

const block: Block = {
    start: 1,
    end: 3,
    content: `
@pilaf:start
color = #000000
@pilaf:end
`,
}

describe("rebuildFile", () => {
    it("replaces block content correctly", () => {
        const blocks = [block]

        const updated = blocks.map((b) => ({
            ...b,
            content: b.content.replace("#000000", "#ffffff"),
        }))

        const rebuilt = rebuildFile(file, updated)

        expect(rebuilt).toContain("#ffffff")
    })
})
