import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'postgresql://postgres:postgres@localhost:5433/jojomendes?schema=public';
}

const prisma = new PrismaClient();

const initialShows = [
  { date: '2026-11-01', city: 'Recife', state: 'PE', venue: 'Villa Forró Music Hall', time: '21:30', status: 'confirmed' },
  { date: '2026-11-03', city: 'Olinda', state: 'PE', venue: 'Varanda do Alto — Sessão Acústica', time: '20:00', status: 'confirmed' },
  { date: '2026-11-05', city: 'Caruaru', state: 'PE', venue: 'Pátio de Eventos Luiz Gonzaga', time: '22:00', status: 'confirmed' },
  { date: '2026-11-06', city: 'João Pessoa', state: 'PB', venue: 'Arena Tambaú Sunset', time: '19:30', status: 'confirmed' },
  { date: '2026-11-07', city: 'Campina Grande', state: 'PB', venue: 'Vila Sítio São João', time: '22:30', status: 'confirmed' },
  { date: '2026-11-08', city: 'Natal', state: 'RN', venue: 'Espaço Ponta Negra Ao Vivo', time: '21:00', status: 'confirmed' },
  { date: '2026-11-10', city: 'Maceió', state: 'AL', venue: 'Orla Pajuçara Lounge', time: '20:30', status: 'confirmed' },
  { date: '2026-11-12', city: 'Aracaju', state: 'SE', venue: 'Passarela do Caranguejo Prime', time: '21:30', status: 'confirmed' },
  { date: '2026-11-13', city: 'Salvador', state: 'BA', venue: 'Largo do Pelourinho — Noite de Cantiga', time: '21:00', status: 'confirmed' },
  { date: '2026-11-14', city: 'Feira de Santana', state: 'BA', venue: 'Estação Forró & Tradição', time: '22:30', status: 'confirmed' },
  { date: '2026-11-15', city: 'Petrolina', state: 'PE', venue: 'Orla do Rio São Francisco', time: '20:00', status: 'confirmed' },
  { date: '2026-11-17', city: 'Juazeiro do Norte', state: 'CE', venue: 'Centro Cultural do Cariri', time: '21:00', status: 'confirmed' },
  { date: '2026-11-19', city: 'Fortaleza', state: 'CE', venue: 'Kukukaya Casa de Forró', time: '22:00', status: 'confirmed' },
  { date: '2026-11-20', city: 'Fortaleza', state: 'CE', venue: 'Complexo Armazém Sunset', time: '20:30', status: 'confirmed' },
  { date: '2026-11-21', city: 'Sobral', state: 'CE', venue: 'Boulevard do Arco da Noite', time: '21:30', status: 'confirmed' },
  { date: '2026-11-22', city: 'Teresina', state: 'PI', venue: 'Theresina Hall Sunset', time: '20:00', status: 'confirmed' },
  { date: '2026-11-25', city: 'Belo Horizonte', state: 'MG', venue: 'Venda Nova das Tradições', time: '21:00', status: 'confirmed' },
  { date: '2026-11-27', city: 'São Paulo', state: 'SP', venue: 'CTN — Centro de Tradições Nordestinas', time: '22:30', status: 'confirmed' },
  { date: '2026-11-28', city: 'Rio de Janeiro', state: 'RJ', venue: 'Feira de São Cristóvão — Palco Principal', time: '22:00', status: 'confirmed' },
  { date: '2026-11-29', city: 'Recife', state: 'PE', venue: 'Marco Zero — Encerramento da Turnê do Mês', time: '19:30', status: 'confirmed' },
];

const initialPhotos = [
  { src: '/media/jojo/foto-ensaio-violao.jpeg', alt: 'Jojo Mendes sorrindo enquanto toca violão e canta ao microfone', width: 1199, height: 1312, order: 0 },
  { src: '/media/jojo/foto-palco-noite.jpeg', alt: 'Jojo Mendes cantando no palco sob iluminação noturna de show', width: 960, height: 960, order: 1 },
  { src: '/media/jojo/foto-show-mesa.jpeg', alt: 'Jojo Mendes cantando ao microfone durante apresentação ao vivo', width: 1199, height: 1312, order: 2 },
  { src: '/media/jojo/foto-ensaio-retrato.jpeg', alt: 'Retrato de Jojo Mendes sorrindo com microfone na mão', width: 995, height: 1581, order: 3 },
  { src: '/media/jojo/foto-show-sorrindo.jpeg', alt: 'Jojo Mendes sorrindo e cantando ao microfone em apresentação', width: 1086, height: 1448, order: 4 },
  { src: '/media/jojo/foto-ensaio-cantando.jpeg', alt: 'Jojo Mendes cantando ao microfone com a mão estendida', width: 1199, height: 1312, order: 5 },
  { src: '/media/jojo/foto-estudio-microfone.png', alt: 'Jojo Mendes em estúdio musical segurando microfone', width: 1088, height: 1446, order: 6 },
  { src: '/media/jojo/foto-recorte.jpeg', alt: 'Jojo Mendes cantando ao microfone e apontando para o público', width: 1118, height: 1600, order: 7 },
];

const initialVideos = [
  { youtubeId: 'QaEwVp334kA', title: 'Jojo Mendes — Ao Vivo (Seresta & Arrocha)', isDemo: false, order: 0 },
  { youtubeId: 'bE1HTm7x9PY', title: 'Quatro Enganados (Versão Arrocha)', isDemo: false, order: 1 },
  { youtubeId: 'VHxHgoNqpL4', title: 'Body Splash — Jojo Mendes', isDemo: false, order: 2 },
  { youtubeId: 'icHtU7KSk2A', title: 'Me Leva Pra Casa / Escrito Nas Estrelas / Saudades', isDemo: false, order: 3 },
  { youtubeId: 'E4ZxPY98Xfs', title: 'Canudinho — Jojo Mendes', isDemo: false, order: 4 },
  { youtubeId: 'afPdDCRmcjw', title: 'Perigo — Jojo Mendes', isDemo: false, order: 5 },
];

async function main() {
  console.log('Populando banco de dados com dados iniciais...');

  // 1. Shows
  const existingShows = await prisma.show.count();
  if (existingShows === 0) {
    for (let i = 0; i < initialShows.length; i++) {
      await prisma.show.create({
        data: {
          ...initialShows[i],
          order: i,
        },
      });
    }
    console.log(`✓ ${initialShows.length} shows inseridos com sucesso.`);
  } else {
    console.log(`Shows já existem no banco (${existingShows} encontrados). Mantendo dados.`);
  }

  // 2. Fotos da Galeria (Máx 8)
  const existingPhotos = await prisma.galleryImage.count();
  if (existingPhotos === 0) {
    for (const photo of initialPhotos) {
      await prisma.galleryImage.create({ data: photo });
    }
    console.log(`✓ ${initialPhotos.length} fotos inseridas na galeria.`);
  } else {
    console.log(`Fotos já existem no banco (${existingPhotos} encontradas). Mantendo dados.`);
  }

  // 3. Vídeos
  const existingVideos = await prisma.video.count();
  if (existingVideos === 0) {
    for (const video of initialVideos) {
      await prisma.video.create({ data: video });
    }
    console.log(`✓ ${initialVideos.length} vídeos inseridos com sucesso.`);
  } else {
    console.log(`Vídeos já existem no banco (${existingVideos} encontrados). Mantendo dados.`);
  }

  console.log('População inicial concluída com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro ao popular banco:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

