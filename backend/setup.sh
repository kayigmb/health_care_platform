#!/bin/sh

echo "Setting up the environment..."
KEY_DIR="src/main/resources/keys"

if [ ! -d "$KEY_DIR" ]; then
    PRIVATE_KEY="$KEY_DIR/private.pem"
    PUBLIC_KEY="$KEY_DIR/public.pem"

    mkdir -p $KEY_DIR

    echo "Generating private authentication key..."
    openssl genpkey -algorithm RSA -out $PRIVATE_KEY -pkeyopt rsa_keygen_bits:2048

    echo "Extracting public authentication key..."
    openssl rsa -pubout -in $PRIVATE_KEY -out $PUBLIC_KEY

    chmod 600 $PRIVATE_KEY
    chmod 644 $PUBLIC_KEY
    echo "Keys generated successfully."
else
    echo "Keys already exist. Skipping key generation."
fi


if [ ! -f .env ]; then
    echo "Create .env file..."
    cp .env.example .env
    echo "Please fill in the required values in the .env file."
else
    echo ".env file already exists. Please ensure it has the correct values."
fi


echo "Done!"
