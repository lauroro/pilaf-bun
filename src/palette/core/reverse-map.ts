// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import type { Palette } from "../../types/palette"
import type { Base16Key } from "../../types/base16-key"

/**
 * Build a reverse map palette: from hex color to base key
 */
export const buildReverseMap = (palette: Palette): Map<string, Base16Key> => {
    const map = new Map<string, Base16Key>()

    for (const [base, color] of Object.entries(palette.colors)) {
        map.set(color.toLowerCase(), base as Base16Key)
    }

    return map
}
