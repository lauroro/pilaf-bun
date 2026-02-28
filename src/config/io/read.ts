// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later

import { PATHS } from "../../env/paths"

/**
 * Read config file content and return it as a string
 */
export const readConfig = async (): Promise<string> => {
    const content = Bun.file(PATHS.CONFIG)
    return await content.text()
}
