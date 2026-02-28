// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import type { Block } from "../../types/block"

const blockStart = "@pilaf:start"
const blockEnd = "@pilaf:end"

/**
 * Extract all pilaf blocks from a file content
 */
export const extractBlocks = (fileContent: string): Block[] => {
    const lines = fileContent.split(/\r?\n/)
    const blocks: Block[] = []

    let currentStart: number | null = null

    lines.forEach((line, index) => {
        if (line.includes(blockStart)) {
            if (currentStart !== null) {
                throw new Error(`Nested ${blockStart} at line ${index + 1}`)
            }
            currentStart = index
        }
        if (line.includes(blockEnd)) {
            if (currentStart === null) {
                throw new Error(`Orphan ${blockEnd} at line ${index + 1}`)
            }
            blocks.push({
                start: currentStart,
                end: index,
                content: lines.slice(currentStart, index + 1).join("\n"),
            })
            currentStart = null
        }
    })

    if (currentStart !== null) {
        throw new Error(
            `Missing ${blockEnd} for block starting at line ${currentStart + 1}`
        )
    }

    return blocks
}
