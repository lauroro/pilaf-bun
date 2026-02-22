import { execSync } from "child_process"
import fs from "fs"

const spdxHeader = `// SPDX-FileCopyrightText: 2026 roro
// SPDX-License-Identifier: GPL-3.0-or-later
\n`

const stagedFiles = execSync("git diff --name-only --cached", {
    encoding: "utf-8",
})
    .split("\n")
    .filter(
        (f) =>
            f &&
            f.startsWith("src/") &&
            (f.endsWith(".js") || f.endsWith(".ts"))
    )

function addLicense(filePath) {
    const content = fs.readFileSync(filePath, "utf-8")

    if (!content.startsWith("// SPDX-FileCopyrightText:")) {
        fs.writeFileSync(filePath, spdxHeader + content)
        console.log(`Added SPDX header to ${filePath}`)

        execSync(`git add ${filePath}`)
    }
}

stagedFiles.forEach((file) => {
    if (fs.existsSync(file)) addLicense(file)
})
