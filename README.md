# ETH Seoul 2024 Hackathon Submission

This repository contains the source code and documentation for our project submission to the ETH Seoul 2024 Hackathon.

## Project Overview
![KakaoTalk_Photo_2024-03-31-11-43-46|50x50](https://github.com/KsPsD/juicy-jems/assets/63996129/29e74b8a-61af-4672-b43f-4f9abaef48bd)

![KakaoTalk_Photo_2024-03-31-11-43-57](https://github.com/KsPsD/juicy-jems/assets/63996129/80626841-cf8b-470e-b2a8-19137596026f)

![KakaoTalk_Photo_2024-03-31-11-44-53](https://github.com/KsPsD/juicy-jems/assets/63996129/aadd2327-286b-4980-8032-863dca8cfbd0)

![KakaoTalk_Photo_2024-03-31-11-45-06](https://github.com/KsPsD/juicy-jems/assets/63996129/212da4a8-2b76-47a7-b373-9aa7b310bea7)

![KakaoTalk_Photo_2024-03-31-11-45-16](https://github.com/KsPsD/juicy-jems/assets/63996129/f3ea1ccc-7129-44a5-93a3-68a5925cd11f)

![KakaoTalk_Photo_2024-03-31-11-45-23](https://github.com/KsPsD/juicy-jems/assets/63996129/ce3d168e-d9d8-4837-ac46-7bfa271d786c)


## Technologies Used

- NEOPIN
- React
- Firebase
- Figma

## Getting Started

### Prerequisites

- Node.js (v18.x.x or later)
- yarn

### Installation

#### Client Part

You can install and run the client part through this. But wallet connect modal will not work properly if you do not set the project setting. [more info](https://docs.walletconnect.com/web3modal/react/about)

```
npm install -g yarn
cd client
yarn
yarn start
```

### Usage

## Smart Contracts

## Frontend

The Client has three main pages; main page(/), investment page(/invest), and random box page(/shopping). And you can also navigate the pages with nav bar(header).

1. Main Page. You can connect your wallet by clicking the big logo in the center. You can navigate to investment page automatically after connection.
2. Investment Page. There are games need funding with progress bar and you can choose what to invest by clicking _FUND_ button. And the modal shows the exchange rate of NPT and stNPT, where the NPT is used to invest and the stNPT is for purchasing random boxes.
3. Random box Page. You can purchase the random box by clicking the main image. It shows games you can choose, and the items and their probabilites. Random boxes have different grades depending on the amount you pay. You can have better items in higher grade random boxes.

## Testing

## Deployment

### Client part

- you need an url to enroll the project for connecting wallet
- we used firebase for react deployment. [You can experience it here(Click)](https://neoland-da93c.web.app/)

## Team

- taeuk ham
  - product manager
  - block chain engineer
- JAEWOOK KOO
  - block chain engineer
- Jihwan Park
  - block chain engineer
- Haelyn Kim
  - ux/ui designer
- MINWOO KIM
  - front-end software developer
- jinhyung noh
  - front-end software developer
