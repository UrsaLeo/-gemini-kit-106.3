#!/bin/bash

set -e

# Set OMNI_REPO_ROOT early so `repo` bootstrapping can target the repository
# root when writing out Python dependencies.
export OMNI_REPO_ROOT="$( cd "$(dirname "$0")" ; pwd -P )"

SCRIPT_DIR=$(dirname ${BASH_SOURCE})
cd "$SCRIPT_DIR"

# This block is used to move extensions from modified to extscache folder for the container to work.
if [[ "$1" == "package" ]]; then
    if [ -d "${OMNI_REPO_ROOT}/modified" ]; then
        cp -r "modified/sunstudy_webrtc"/* "_build/linux-x86_64/release/extscache"
        echo "Extensions copied to _build/extscache."
    else
        echo "No 'modified' folder found, skipping extension copy."
    fi
fi

# Use "exec" to ensure that envrionment variables don't accidentally affect other processes.
exec "tools/packman/python.sh" tools/repoman/repoman.py "$@"
