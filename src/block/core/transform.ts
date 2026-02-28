// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { buildReverseMap } from "../../palette/core/reverse-map"
import type { Block } from "../../types/block"
import type { Palette } from "../../types/palette"

/**
 * Replace colors inside blocks using palette mapping
 */
export const transformBlocks = (
    blocks: Block[],
    oldPalette: Palette,
    newPalette: Palette
): Block[] => {
    const oldPaletteReverseMap = buildReverseMap(oldPalette)

    return blocks.map((block) => {
        const updated = block.content.replace(/#?[0-9a-fA-F]{6}/g, (match) => {
            const normalized = match.replace(/^#/, "").toLowerCase()
            const base = oldPaletteReverseMap.get(normalized)

            if (!base) return match

            const newColor = newPalette.colors[base]
            return match.startsWith("#") ? `#${newColor}` : newColor
        })

        return { ...block, content: updated }
    })
}
