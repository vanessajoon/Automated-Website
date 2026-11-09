#!/bin/bash


Required_files=("index.html" "script.js" "style.css")
missing_file=0

# Checking if file exists
for file in "${Required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "$file exists"
    else
        echo "$file does not exist"
        missing_file=1
    fi
done

# If any file is missing, abort completely before touching Nginx

if [ $missing_file -eq 1 ]; then
    echo "Deployment aborted: One or more required files are missing."
    exit 1
fi       

# Backing up files
mkdir -p backup
for file in "${Required_files[@]}"; do
    cp "$file" backup/
done

# Installing dependencies
echo "Installing Nginx.."
sudo apt update > /dev/null 
sudo apt install nginx -y > /dev/null
sudo systemctl enable --now nginx > /dev/null

# Deploy the files to the nginx web root
echo "Deploying files to web root"
for file in "${Required_files[@]}"; do
    sudo cp "$file" /var/www/html/
done

sudo systemctl restart nginx > /dev/null

echo "========================="
echo "DEPLOYMENT COMPLETE"
echo "========================="
echo "Website deployed successfully"
echo


status=$(sudo systemctl is-active nginx)
echo "Nginx Status: $status"

date="Date: $(date)"
echo "$date"

host=$(hostname)
echo "Server: $host"