// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import type { Block } from "../../types/block"

/**
 * Rebuild file content replacing blocks at their original positions
 */
export const rebuildFile = (
    originalContent: string,
    blocks: Block[]
): string => {
    const lines = originalContent.split(/\r?\n/)
    const newLines = [...lines]

    // process from bottom to top to avoid that splices break indexes
    const sorted = [...blocks].sort((a, b) => b.start - a.start)

    for (const block of sorted) {
        const replacement = block.content.split("\n")
        newLines.splice(
            block.start,
            block.end - block.start + 1,
            ...replacement
        )
    }

    return newLines.join("\n")
}
