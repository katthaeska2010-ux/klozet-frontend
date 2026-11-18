// DADOS DE EXEMPLO. Quando o backend estiver pronto, estas listas
// serão trocadas por chamadas à API. As telas não precisam mudar muito.

export const products = [
  { id: 1, name: "Jaqueta Jeans",   shop: "Recanto Vintage",   category: "Jaquetas", gender: "Feminino",  size: "P",  color: "Azul",      price: 40.94, status: "ativo",     emoji: "🧥" },
  { id: 2, name: "Vestido Floral",  shop: "Aconchego Vintage", category: "Vestidos", gender: "Feminino",  size: "M",  color: "Floral",    price: 70.99, status: "reservado", emoji: "👗" },
  { id: 3, name: "Camisa Social",   shop: "Recanto Vintage",   category: "Camisas",  gender: "Masculino", size: "G",  color: "Branco",    price: 49.0,  status: "esgotado",  emoji: "👔" },
  { id: 4, name: "Jaqueta Puffer",  shop: "Recanto Vintage",   category: "Jaquetas", gender: "Feminino",  size: "P",  color: "Off-white", price: 180.9, status: "ativo",     emoji: "🧥" },
  { id: 5, name: "Calça Wide Leg",  shop: "Recanto Vintage",   category: "Calças",   gender: "Feminino",  size: "M",  color: "Brown",     price: 150.9, status: "ativo",     emoji: "👖" },
  { id: 6, name: "Calça Reta",      shop: "Brechó da Ana",     category: "Calças",   gender: "Masculino", size: "G",  color: "Preto",     price: 89.9,  status: "ativo",     emoji: "👖" },
  { id: 7, name: "Moletom Canguru", shop: "Aconchego Vintage", category: "Moletons", gender: "Unissex",   size: "GG", color: "Cinza",     price: 65.0,  status: "ativo",     emoji: "🧶" },
  { id: 8, name: "Calça Flare",     shop: "Brechó da Ana",     category: "Calças",   gender: "Feminino",  size: "P",  color: "Jeans",     price: 79.9,  status: "ativo",     emoji: "👖" },
];

export const campaigns = [
  { id: 1, name: "Inverno Solidário",   description: "Agasalhos e peças de frio para famílias atendidas por ONGs parceiras em Minas Gerais.", goal: 200, collected: 90, status: "ativa" },
  { id: 2, name: "Volta às Aulas",      description: "Uniformes e roupas infantis para crianças em início de ano letivo.",                    goal: 150, collected: 80, status: "ativa" },
  { id: 3, name: "Reconstrução do Sul", description: "Doações para famílias afetadas por enchentes no Rio Grande do Sul.",                  goal: 300, collected: 0,  status: "embreve", startsAt: "05/10" },
];

export const orders = [
  { id: "34567", customer: "Ana Maria",    item: "Vestido Floral M", date: "2026-09-07", total: 70.99, status: "pendente" },
  { id: "12345", customer: "Júlia Santos", item: "Jaqueta Jeans P",  date: "2026-08-07", total: 40.94, status: "caminho" },
  { id: "90908", customer: "Júlio Cesar",  item: "Camisa Social G",  date: "2025-10-15", total: 49.0,  status: "cancelado" },
  { id: "51186", customer: "Sara Martins", item: "Jaqueta Jeans P",  date: "2025-10-15", total: 40.94, status: "enviado" },
];

export const donatedItems = [
  { id: 1, piece: "Casaco de lã M",  campaign: "Inverno Solidário", date: "2026-09-18", status: "doada" },
  { id: 2, piece: "Cachecol tricô",  campaign: "Inverno Solidário", date: "2026-09-18", status: "doada" },
  { id: 3, piece: "Blusa moletom G", campaign: "Inverno Solidário", date: "2026-09-18", status: "coleta" },
];

export const reviews = [
  { id: 1, author: "Carmen Vitória", when: "5h atrás", stars: 5, text: "Amei as roupas desse brechó, comprei esse lindo vestido nessa loja, arrasaram demais!" },
];