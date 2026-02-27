// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { PATHS } from "../../env/paths"

/**
 * Open the state file and return its content as a string
 */
export const readState = async (): Promise<string> => {
    const file = Bun.file(PATHS.STATE)
    return await file.text()
}
