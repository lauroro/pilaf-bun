// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

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
    return blocks
}
