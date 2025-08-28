# NENO XMD BOT (V2)
<p align="center">
<a href="https://github.com/Nimeshkamihiran"><img title="Author" src="https://files.catbox.moe/z5lhou.jpg"></a>

<p align="center">
<a href="https://github.com/Nimeshkamihiran/followers"><img title="Followers" src="https://img.shields.io/github/followers/Nimeshkamihiran?color=blue&style=flat-square"></a>
<a href="https://github.com/Nimeshkamihiran/neno-xmd-bot/stargazers/"><img title="Stars" src="https://img.shields.io/github/stars/Nimeshkamihiran/neno-xmd-bot?color=blue&style=flat-square"></a>
<a href="https://github.com/Nimeshkamihiran/neno-xmd-bot/network/members"><img title="Forks" src="https://img.shields.io/github/forks/Nimeshkamihiran/neno-xmd-bot?color=blue&style=flat-square"></a>
<a href="https://github.com/Nimeshkamihiran/neno-xmd-bot/"><img title="Size" src="https://img.shields.io/github/repo-size/Nimeshkamihiran/neno-xmd-bot?style=flat-square&color=green"></a>
<a href="https://github.com/Nimeshkamihiran/neno-xmd-bot/graphs/commit-activity"><img height="20" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg"></a>
</p>

---

<p align="center">
<a aria-label="Join our chats" href="https://chat.whatsapp.com/Ekoe6EykUJf0KfQShsBfoN?mode=ac_t" target="_blank">
<img alt="whatsapp" src="https://img.shields.io/badge/Join Group-25D366?style=for-the-badge&logo=telegram&logoColor=white" />
</a>
</p>

---

<p align="center"><img src="https://profile-counter.glitch.me/{NENO-XMD}/count.svg" alt="Nimeshkamihiran :: Visitor's Count" /></p>

<p align="center">
Meet <b>NENO XMD BOT</b>, your all-in-one WhatsApp AI Buddy!  
Super fast, full-featured, and designed for fun + productivity.  
Bring automation, entertainment, and unique features to your chats!
               𝗕𝗬 𝗡𝗜𝗠𝗘𝗦𝗛𝗞𝗔 𝗠𝗜𝗛𝗜𝗥𝗔𝗡 / 𝗦𝗛𝗔𝗗𝗢𝗪 𝗙𝗫 / 𝗕𝗟𝗔𝗖𝗞𝗬 ✨🤖
</p>

<a href="https://github.com/Nimeshkamihiran/neno-xmd-bot/fork"><img title="NENO-XMD" src="https://img.shields.io/badge/FORK-NENO XMD-h?color=blue&style=for-the-badge&logo=stackshare"></a>

---

## Deployment Methods
1. **Get [`SESSION ID`](https://neno-pair-k47s.onrender.com) by Pair Code or Scanning QR code**  
   
  


2. **Star ⭐ this repository** & Click [FORK](https://github.com/Nimeshkamihiran/neno-xmd-bot/fork)

---

### 3. Deploy on Heroku
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=new)

---

### 4. Deploy on Replit
<a href='https://repl.it/github/Nimeshkamihiran/neno-xmd-bot' target="_blank"><img alt='DEPLOY' src='https://img.shields.io/badge/-REPLIT-orange?style=for-the-badge&logo=replit&logoColor=white'/></a>

---

### 5. Deploy on Koyeb
<a href='https://app.koyeb.com/auth/signin' target="_blank"><img alt='DEPLOY' src='https://img.shields.io/badge/-KOYEB-blue?style=for-the-badge&logo=koyeb&logoColor=white'/></a>

---

### 6. Deploy on Codespace
<a href='https://github.com/codespaces/new' target="_blank"><img alt='DEPLOY' src='https://img.shields.io/badge/CODESPACE-h?color=navy&style=for-the-badge&logo=visualstudiocode'/></a>

---

### 7. Deploy on Render
<a href='https://dashboard.render.com' target="_blank"><img alt='DEPLOY' src='https://img.shields.io/badge/RENDER-h?color=maroon&style=for-the-badge&logo=render'/></a>

---

### 8. Deploy on Railway
<a href='https://railway.app/new' target="_blank"><img alt='DEPLOY' src='https://img.shields.io/badge/RAILWAY-h?color=black&style=for-the-badge&logo=railway'/></a>

<p align="center">
<a href="https://github.com/Nimeshkamihiran"><img title="Author" src="https://files.catbox.moe/c1urvj.jpg"></a>

### 9.DEPLOY WORKFLOW
<b><strong><summary align="center" style="color: Yello;">Deploy NENO XMD On Workflow</summary></strong></b>
<p style="text-align: center; font-size: 1.2em;">
 
<h8>Copy the workflow codes and then fork the repo edit config add session id then save and now click on repo action tag then click on start new workflow then paste workflow codes rename main.yml to deploy.yml and save the file</h8>
<h3 align-"center"> Important</h3>
<h6 align-"center">Attention! We do not take responsibility if your github account is suspended through this Deploy method, I advise you not to use this workflow deploy method in the latest github accounts, github accounts created a year or more ago have not received the risk of suspension so far, this works It will only be done for 6 hours, you need to update the code to reactivate it.</h6>

```
name: Node.js CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x]

    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}

    - name: Install dependencies
      run: npm install

    - name: Start application
      run: npm start
```
</details> 



---

## VPS / PC Installation

```bash
sudo apt -y update && sudo apt -y upgrade 
sudo apt -y install git ffmpeg curl imagemagick
sudo apt -y remove nodejs
curl -fsSl https://deb.nodesource.com/setup_lts.x | sudo bash - && sudo apt -y install nodejs
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt -y update && sudo apt -y install yarn
sudo yarn global add pm2
git clone https://github.com/Nimeshkamihiran/neno-xmd-bot
cd neno-xmd-bot
yarn install --network-concurrency 1 && npm install
