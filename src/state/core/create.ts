// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import type { Palette } from "../../types/palette"
import type { State } from "../../types/state"

/**
 * Create a State object
 */
export const createState = (palette: Palette): State => {
    return {
        currentPalette: palette,
        createdAt: new Date().toISOString(),
    }
}
