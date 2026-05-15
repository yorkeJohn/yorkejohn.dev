#!/bin/bash
ssh pi "sudo -u webadmin bash -lc \
  'cd /opt/webadmin/yorkejohn.dev && docker compose pull && docker compose up -d && docker system prune -af'
"