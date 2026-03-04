// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import type { Palette } from "../../types/palette"
import { asyncPipe } from "../../utils/async-pipe"
import { buildPalette } from "../core/build"
import { normalizePalette } from "../core/normalize"
import { parseColors } from "../core/parse"
import { validatePalette } from "../core/validate"
import { readPalette } from "../io/read"

/**
 * Read, parse, build, validate and normalize palette
 */
export const loadPalette = async (name: string): Promise<Palette> => {
    const pipeline = asyncPipe(
        (name) => readPalette(name),
        parseColors,
        (colors) => buildPalette(name, colors),
        validatePalette,
        normalizePalette
    )

    return pipeline(name)
}
