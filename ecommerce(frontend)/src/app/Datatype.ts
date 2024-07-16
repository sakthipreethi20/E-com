export interface login {
  username: string;
  password: string;
}
export interface signup {
  username: string;
  password: string;
  emailid: string;
}
export interface Watch {
  quantity: number;
  brand: string;
  name: string;
  price: string;
  imageUrl: string;
  dialColor: string;
  strapMaterial: string;
  id: number;
}

export interface Order {
  // date: Date;
  id: number;
  items: Watch[];
  totalPrice: number;
  shippingAddress: string;
}
