// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { PATHS } from "../../env/paths"

/**
 * Read a palette file and return its content as a string
 */
export async function readPalette(name: string): Promise<string> {
    const path = `${PATHS.PALETTES}/${name}.yaml`
    const file = Bun.file(path)
    return await file.text()
}
