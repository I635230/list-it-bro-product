#!/bin/bash
# run_jobs.sh

cd /var/www/list-it-bro-product/backend && bundle exec rails runner -e production 'Batch::Clips.update_all' >> /var/www/list-it-bro-product/backend/log/cron.log 2>&1
cd /var/www/list-it-bro-product/backend && bundle exec rails runner -e production 'Batch::Rankings.destroy' >> /var/www/list-it-bro-product/backend/log/cron.log 2>&1
cd /var/www/list-it-bro-product/backend && bundle exec rails runner -e production 'Batch::Rankings.create' >> /var/www/list-it-bro-product/backend/log/cron.log 2>&1
