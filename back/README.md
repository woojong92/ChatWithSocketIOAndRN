```
IUser {
    name: string;
    phoneNumber: string;
    signupType: string;
    snsId: string;
    password: string;
    email: string;
}

IProduct {
    title: string;
    price: number;
    description: string;
    sellerId: string;
    seller: IUser;
}

IChatroom {
    productId: string;
    product: IProduct;
    buyerId: string;
    buyer: IUser;
    seller: IUser;
}

IMessage {
    chatroomId: string;
    senderId: string;
    receiverId: string;
    sender: IUser;
    receiver: IUser;
}
```

## GET /users
- isLoggedIn
- 내 로그인 정보를 가져옴, 로그인되어있지 않으면 false
- return IUser | false

## POST /users
- isNotLoggedIn
- 회원가입

## Post /users/login
- isNotLoggedIn
- 로그인

## POST /users/logout

## POST /products
- isLoggedIn
- 중고 상품 등록

- body : {
    title: string;
    price: number;
    description: string;
    sellerId: string;
}

## GET /products
- 등록된 중고 상품 목록을 가져옴

## GET /products/:product
- :product에 해당하는 상품의 정보를 가져옴

## POST /products/:product/chatrooms/:buyer/messages
<!-- - :product의 seller와 buyer의 채팅 메세지 보내기 -->

## GET /products/:product/chatrooms/:id/messages
<!-- - :product의 seller와 buyer의 채팅 메세지 가져오기 -->

## GET /products/:product/chatrooms/:id/unreads
<!-- - :product의 seller와 buyer의 채팅 메세지 가져오기 -->




