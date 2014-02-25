#!/bin/bash

./autogen.sh
CFLAGS="-O2 -Wall -march=native" ./configure --enable-avalon --enable-bab --enable-bflsc --enable-bitforce --enable-bitfury --enable-cointerra --enable-bitmine_A1 --enable-drillbit --enable-hashfast --enable-icarus --enable-klondike --enable-knc --enable-avalon2 --enable-minion --enable-modminer
make