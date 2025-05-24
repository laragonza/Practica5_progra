export type Contact = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  chatId: string;
};

export type Message = {
  _id: string;
  chatId: string;
  isContactMessage: boolean;
  content: string;
  timestamp: string;
};
