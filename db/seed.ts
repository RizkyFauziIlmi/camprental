import { addDays } from "date-fns";
import { Item, PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { createId } from "@paralleldrive/cuid2";

const prisma = new PrismaClient();

const itemData: Item[] = [
  {
    id: createId(),
    name: "Kompas Darurat",
    description: "Kompas multifungsi dengan peluit darurat.",
    price: faker.number.float({ min: 3_000, max: 5_000, fractionDigits: 0 }),
    category: "NAVIGATION_SECURITY",
    imageUrl:
      "https://down-id.img.susercontent.com/file/bad51ab95f618e9c02be643065656358",
    stock: faker.number.int({ min: 10, max: 15 }),
    maxBookings: faker.number.int({ min: 1, max: 4 }),
    available: faker.datatype.boolean({ probability: 0.9 }),
    maxDate: faker.number.int({ min: 1, max: 14 }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    name: "Tenda 1 Orang",
    description:
      "Tenda ukuran 1 orang yang ringan dan mudah dibawa ke mana saja.",
    price: faker.number.float({
      min: 20_000,
      max: 100_000,
      fractionDigits: 0,
    }),
    category: "TENT",
    imageUrl:
      "https://down-id.img.susercontent.com/file/sg-11134201-7rbmh-lmumiovd46e216",
    stock: faker.number.int({ min: 5, max: 10 }),
    maxBookings: faker.number.int({ min: 1, max: 3 }),
    available: faker.datatype.boolean({ probability: 0.8 }),
    maxDate: faker.number.int({ min: 1, max: 14 }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    name: "Sleeping Bag",
    description: "Tidur dan istirahat dengan sleeping bag yang nyaman.",
    price: faker.number.float({ min: 5_000, max: 10_000, fractionDigits: 0 }),
    category: "SLEEP_REST",
    imageUrl:
      "https://down-id.img.susercontent.com/file/id-11134207-7r98z-lm4ctzlrwia4c1",
    stock: faker.number.int({ min: 5, max: 15 }),
    maxBookings: faker.number.int({ min: 1, max: 5 }),
    available: faker.datatype.boolean({ probability: 0.7 }),
    maxDate: faker.number.int({ min: 1, max: 14 }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    name: "Matras atau Kasur Angin",
    description:
      "Matras atau kasur angin untuk kenyamanan tidur di alam terbuka.",
    price: faker.number.float({ min: 10_000, max: 15_000, fractionDigits: 0 }),
    category: "SLEEP_REST",
    imageUrl:
      "https://down-id.img.susercontent.com/file/f0e7633f7da62b269bc0e0003094bb15",
    stock: faker.number.int({ min: 5, max: 20 }),
    maxBookings: faker.number.int({ min: 1, max: 3 }),
    available: faker.datatype.boolean({ probability: 0.8 }),
    maxDate: faker.number.int({ min: 1, max: 14 }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    name: "Selimut",
    description: "selimut untuk kenyamanan tidur di alam terbuka.",
    price: faker.number.float({ min: 10_000, max: 15_000, fractionDigits: 0 }),
    category: "SLEEP_REST",
    imageUrl:
      "https://down-id.img.susercontent.com/file/id-11134207-7r98r-llccofy1c66v85",
    stock: faker.number.int({ min: 5, max: 20 }),
    maxBookings: faker.number.int({ min: 1, max: 4 }),
    available: faker.datatype.boolean({ probability: 0.9 }),
    maxDate: faker.number.int({ min: 1, max: 14 }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    name: "Meja Lipat",
    description:
      "Meja lipat yang ringan dan mudah dibawa untuk keperluan camping.",
    price: faker.number.float({
      min: 20_000,
      max: 30_000,
      fractionDigits: 0,
    }),
    category: "FURNITURE_COOK_EQUIP",
    imageUrl:
      "https://down-id.img.susercontent.com/file/id-11134207-7qul0-liclnn3gp1r5e6",
    stock: faker.number.int({ min: 3, max: 8 }),
    maxBookings: faker.number.int({ min: 1, max: 2 }),
    available: faker.datatype.boolean({ probability: 0.7 }),
    maxDate: faker.number.int({ min: 1, max: 14 }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    name: "Kursi Lipat",
    description: "Kursi lipat yang nyaman untuk bersantai di perkemahan.",
    price: faker.number.float({ min: 10_000, max: 15_000, fractionDigits: 0 }),
    category: "FURNITURE_COOK_EQUIP",
    imageUrl:
      "https://down-id.img.susercontent.com/file/id-11134207-7r98y-lqk6bxdrqiuwbb",
    stock: faker.number.int({ min: 5, max: 15 }),
    maxBookings: faker.number.int({ min: 1, max: 3 }),
    available: faker.datatype.boolean({ probability: 0.8 }),
    maxDate: faker.number.int({ min: 1, max: 14 }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    name: "Kompor Camping",
    description: "Kompor camping portabel dengan tabung gas.",
    price: faker.number.float({
      min: 15_000,
      max: 40_000,
      fractionDigits: 0,
    }),
    category: "FURNITURE_COOK_EQUIP",
    imageUrl:
      "https://down-id.img.susercontent.com/file/2acf7c62eb64b236958e0c47c79d41a5",
    stock: faker.number.int({ min: 3, max: 10 }),
    maxBookings: faker.number.int({ min: 1, max: 2 }),
    available: faker.datatype.boolean({ probability: 0.6 }),
    maxDate: faker.number.int({ min: 1, max: 14 }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    name: "Tabung Gas",
    description: "Tabung gas cadangan untuk kompor camping.",
    price: faker.number.float({ min: 5_000, max: 10_000, fractionDigits: 0 }),
    category: "FURNITURE_COOK_EQUIP",
    imageUrl:
      "https://down-id.img.susercontent.com/file/sg-11134201-23030-o6jsemvwxeov60",
    stock: faker.number.int({ min: 5, max: 20 }),
    maxBookings: faker.number.int({ min: 1, max: 4 }),
    available: faker.datatype.boolean({ probability: 0.9 }),
    maxDate: faker.number.int({ min: 1, max: 14 }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    name: "Panci Camping",
    description: "Panci berkualitas tinggi untuk memasak di alam terbuka.",
    price: faker.number.float({ min: 5_000, max: 15_000, fractionDigits: 0 }),
    category: "COOKWARE",
    imageUrl:
      "https://down-id.img.susercontent.com/file/30e1506aa7cca2c1f2a0bfb52ae4c6a4",
    stock: faker.number.int({ min: 3, max: 8 }),
    maxBookings: faker.number.int({ min: 1, max: 2 }),
    available: faker.datatype.boolean({ probability: 0.7 }),
    maxDate: faker.number.int({ min: 1, max: 14 }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    name: "Sikat Piring",
    description:
      "Sikat piring yang kuat dan tahan lama untuk keperluan camping.",
    price: faker.number.float({ min: 2_000, max: 3_000, fractionDigits: 0 }),
    category: "HYGIENE_HEALTH",
    imageUrl:
      "https://down-id.img.susercontent.com/file/id-11134207-7r98v-lphit6ihbgs51e",
    stock: faker.number.int({ min: 10, max: 30 }),
    maxBookings: faker.number.int({ min: 1, max: 5 }),
    available: faker.datatype.boolean({ probability: 0.9 }),
    maxDate: faker.number.int({ min: 1, max: 14 }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    name: "Lampu Camping",
    description: "Lampu camping portable untuk penerangan di malam hari.",
    price: faker.number.float({ min: 3_000, max: 10_000, fractionDigits: 0 }),
    category: "LIGHT_ELECTRIC",
    imageUrl:
      "https://down-id.img.susercontent.com/file/id-11134207-7qul8-lhub9lxcvysw03",
    stock: faker.number.int({ min: 5, max: 15 }),
    maxBookings: faker.number.int({ min: 1, max: 3 }),
    available: faker.datatype.boolean({ probability: 0.8 }),
    maxDate: faker.number.int({ min: 1, max: 14 }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    name: "Tali Pengaman",
    description: "Tali pengaman yang kuat untuk kegiatan outdoor.",
    price: faker.number.float({ min: 1_000, max: 5_000, fractionDigits: 0 }),
    category: "NAVIGATION_SECURITY",
    imageUrl:
      "https://down-id.img.susercontent.com/file/f4fd6b7fcececd55e2796a7548b911a6",
    stock: faker.number.int({ min: 5, max: 20 }),
    maxBookings: faker.number.int({ min: 1, max: 3 }),
    available: faker.datatype.boolean({ probability: 0.8 }),
    maxDate: faker.number.int({ min: 1, max: 14 }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    name: "Topi Outdoor",
    description: "Topi outdoor untuk perlindungan dari sinar matahari.",
    price: faker.number.float({ min: 2_000, max: 8_000, fractionDigits: 0 }),
    category: "OUTDOOR_EQUIP",
    imageUrl:
      "https://down-id.img.susercontent.com/file/5f85ff02057158d040bfaac2f1f9f518",
    stock: faker.number.int({ min: 10, max: 30 }),
    maxBookings: faker.number.int({ min: 1, max: 5 }),
    available: faker.datatype.boolean({ probability: 0.9 }),
    maxDate: faker.number.int({ min: 1, max: 14 }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: createId(),
    name: "Tas Ransel",
    description:
      "Tas ransel untuk membawa perlengkapan saat hiking atau camping.",
    price: faker.number.float({
      min: 10_000,
      max: 30_000,
      fractionDigits: 0,
    }),
    category: "TRANSPORT_EQUIP",
    imageUrl:
      "https://down-id.img.susercontent.com/file/id-11134207-7r98t-lloewmi4c2er22",
    stock: faker.number.int({ min: 5, max: 15 }),
    maxBookings: faker.number.int({ min: 1, max: 3 }),
    available: faker.datatype.boolean({ probability: 0.8 }),
    maxDate: faker.number.int({ min: 1, max: 14 }),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const main = async () => {
  try {
    for (const item of itemData) {
      await prisma.item.create({
        data: item,
      });
    }
  } catch (error) {
    throw error;
  }
};

main().catch((err) => {
  console.warn("Error While generating Seed: \n", err);
});
