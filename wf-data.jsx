// ---- Wireframe data: categories + products (generic placeholder names) ----

const WF_CATEGORIES = [
  { key: 'dispos', name: 'Одноразовые', sub: 'pod-устройства', count: 48 },
  { key: 'pod',    name: 'POD-системы', sub: 'многоразовые',   count: 32 },
  { key: 'liquid', name: 'Жидкости',    sub: 'e-liquid',        count: 120 },
  { key: 'coil',   name: 'Картриджи',   sub: 'испарители',      count: 64 },
  { key: 'acc',    name: 'Аксессуары',  sub: 'зарядки, чехлы',  count: 27 },
  { key: 'cons',   name: 'Расходники',  sub: 'вата, намотка',   count: 19 },
];

const WF_CAT_MAP = Object.fromEntries(WF_CATEGORIES.map(c => [c.key, c]));

// spec: short line shown under name. tag: optional badge.
// smart: optional volume-pricing tiers [minQty, unitPrice] — "Smart Cena".
const WF_PRODUCTS = [
  { id: 'p1',  name: 'Pod One 6000', brand: 'AeroLab', cat: 'dispos', price: 690, old: 890, spec: '6000 тяг · 2%', tag: 'Хит',     flavors: ['Мята', 'Ягоды', 'Кола', 'Манго'], smart: [[3,650],[5,620],[10,590],[20,560],[50,530],[100,490]] },
  { id: 'p2',  name: 'Mist 8000',     brand: 'Nuvo',    cat: 'dispos', price: 790, spec: '8000 тяг · 2%',        tag: 'Новинка', flavors: ['Арбуз', 'Лёд', 'Виноград'], smart: [[3,750],[5,720],[10,690],[20,650],[50,620],[100,570]] },
  { id: 'p3',  name: 'Cloud Air S',   brand: 'AeroLab', cat: 'dispos', price: 590, spec: '4000 тяг · 5%',        flavors: ['Табак', 'Мята', 'Персик'], smart: [[3,560],[5,530],[10,510],[20,480],[50,450],[100,420]] },
  { id: 'p4',  name: 'Volt Mini',     brand: 'Volt',    cat: 'pod',    price: 1490, old: 1790, spec: '900 mAh · 2 мл', tag: 'Хит',  flavors: ['Графит', 'Сталь', 'Песок'], smart: [[3,1420],[5,1370],[10,1320],[20,1260],[50,1190],[100,1090]] },
  { id: 'p5',  name: 'Vega Pro Kit',  brand: 'Vega',    cat: 'pod',    price: 2390, spec: '1500 mAh · 3 мл',     tag: 'Топ',     flavors: ['Чёрный', 'Серебро'], smart: [[3,2290],[5,2210],[10,2120],[20,2020],[50,1910],[100,1750]] },
  { id: 'p6',  name: 'Slim Pod Z',    brand: 'Nuvo',    cat: 'pod',    price: 1190, spec: '800 mAh · 2 мл',      flavors: ['Графит', 'Молоко'], smart: [[3,1140],[5,1100],[10,1050],[20,1000],[50,950],[100,870]] },
  { id: 'p7',  name: 'Salt Berry 30', brand: 'Aroma',   cat: 'liquid', price: 450, spec: '30 мл · 20 мг',        tag: 'Хит',     flavors: ['20 мг', '12 мг'], smart: [[3,420],[5,400],[10,380],[20,360],[50,340],[100,310]] },
  { id: 'p8',  name: 'Ice Mint 30',   brand: 'Aroma',   cat: 'liquid', price: 450, spec: '30 мл · 20 мг',        flavors: ['20 мг', '12 мг', '0 мг'], smart: [[3,420],[5,400],[10,380],[20,360],[50,340],[100,310]] },
  { id: 'p9',  name: 'Tropic Mix 30', brand: 'Frutta',  cat: 'liquid', price: 490, old: 590, spec: '30 мл · 20 мг', tag: 'Новинка', flavors: ['20 мг', '12 мг'], smart: [[3,460],[5,440],[10,420],[20,400],[50,375],[100,340]] },
  { id: 'p10', name: 'Coil Mesh 0.6', brand: 'Volt',    cat: 'coil',   price: 290, spec: 'упак. 5 шт · 0.6 Ω',    flavors: ['0.6 Ω', '0.8 Ω'], smart: [[3,270],[5,255],[10,240],[20,225],[50,210],[100,190]] },
  { id: 'p11', name: 'Cart Refill X', brand: 'Vega',    cat: 'coil',   price: 350, spec: 'упак. 3 шт · 1.2 мл',  tag: 'Хит',     flavors: ['1.2 мл'], smart: [[3,330],[5,315],[10,295],[20,280],[50,260],[100,235]] },
  { id: 'p12', name: 'Charger 2A',    brand: 'Volt',    cat: 'acc',    price: 390, spec: 'USB-C · 2 A',          flavors: ['Чёрный', 'Белый'], smart: [[3,370],[5,355],[10,335],[20,315],[50,295],[100,265]] },
  { id: 'p13', name: 'Soft Case',     brand: 'Nuvo',    cat: 'acc',    price: 590, old: 790, spec: 'силикон · pod', flavors: ['Графит', 'Песок', 'Хаки'], smart: [[3,560],[5,535],[10,510],[20,480],[50,450],[100,410]] },
  { id: 'p14', name: 'Lanyard Clip',  brand: 'AeroLab', cat: 'acc',    price: 250, spec: 'шнурок + клипса',       flavors: ['Чёрный'], smart: [[3,235],[5,225],[10,210],[20,195],[50,180],[100,160]] },
  { id: 'p15', name: 'Cotton Pro',    brand: 'Frutta',  cat: 'cons',   price: 190, spec: 'органик · 10 г',        flavors: ['10 г'], smart: [[3,175],[5,165],[10,155],[20,145],[50,135],[100,120]] },
  { id: 'p16', name: 'Wire Kanthal',  brand: 'Vega',    cat: 'cons',   price: 220, spec: '0.5 мм · 10 м',         flavors: ['0.5 мм', '0.4 мм'], smart: [[3,205],[5,195],[10,185],[20,170],[50,155],[100,140]] },
];

const WF_PROD_MAP = Object.fromEntries(WF_PRODUCTS.map(p => [p.id, p]));

const WF_PROMOS = [
  { title: '−20% на одноразки', sub: 'до конца недели', cat: 'dispos' },
  { title: 'Жидкости 3 по цене 2', sub: 'набор вкусов', cat: 'liquid' },
];

Object.assign(window, { WF_CATEGORIES, WF_CAT_MAP, WF_PRODUCTS, WF_PROD_MAP, WF_PROMOS });
