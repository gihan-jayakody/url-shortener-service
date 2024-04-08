import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()


const urlData: any[] = [
  {
    longUrl: 'https://www.digitalocean.com/products/kubernetes',
    shortenedUrl: '5_bHQwWrc'
  },
  {
    longUrl: 'https://www.digitalocean.com/products/managed-databases-mongodb',
    shortenedUrl: '5zjv6Zdrq'
  },
  {
    longUrl: "https://www.digitalocean.com/products/managed-databases-kafka",
    shortenedUrl: "I5ZF3GNoi"
  },
  {
    longUrl: "https://www.digitalocean.com/products/managed-databases-mysql",
    shortenedUrl: "qSUMsVLBa"
  },
  {
    longUrl: "https://www.digitalocean.com/products/managed-databases-postgresql",
    shortenedUrl: "cfgN7hFHM"
  }
]


async function main() {
  console.log(`Start seeding ...`)
  for (const u of urlData) {
    const createdUrl = await prismaClient.urls.create({
      data: u,
    })
    console.log(`Created shortened url with id: ${createdUrl.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prismaClient.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prismaClient.$disconnect()
    process.exit(1)
  })