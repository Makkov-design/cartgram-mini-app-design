// ---- App shell: state, phone frame, nav, scaling, side chrome ----
const { useEffect, useRef } = React;

const WF_TABS = [
  { key: 'home', label: 'Главная', icon: 'home' },
  { key: 'categories', label: 'Категории', icon: 'grid' },
  { key: 'cart', label: 'Корзина', icon: 'cart' },
  { key: 'favorites', label: 'Избранное', icon: 'heart' },
  { key: 'profile', label: 'Профиль', icon: 'user' },
];

function WFApp() {
  const [tab, setTab] = useState('home');
  const [stack, setStack] = useState([]);
  const [cart, setCart] = useState({ p1: 1, p7: 2 });
  const [favs, setFavs] = useState({ p4: true, p9: true });
  const [mapView, setMapView] = useState('screens'); // 'screens' | 'components'
  const homeVariant = 1;
  const scaleRef = useRef(null);
  const stageRef = useRef(null);

  // ---- scaling ----
  useEffect(() => {
    const fit = () => {
      if (!stageRef.current || !scaleRef.current) return;
      const r = stageRef.current.getBoundingClientRect();
      const s = Math.min((r.height - 36) / 858, (r.width - 36) / 402, 1.05);
      scaleRef.current.style.transform = `scale(${Math.max(s, 0.3)})`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    if (stageRef.current) ro.observe(stageRef.current);
    window.addEventListener('resize', fit);
    return () => { ro.disconnect(); window.removeEventListener('resize', fit); };
  }, []);

  const top = stack[stack.length - 1] || null;
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const ctx = {
    cart, favs, homeVariant,
    navigate: (type, params = {}) => setStack(s => [...s, { type, params }]),
    back: () => setStack(s => s.slice(0, -1)),
    goTab: (t) => { setStack([]); setTab(t); },
    addToCart: (id) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 })),
    setQty: (id, n) => setCart(c => { const x = { ...c }; if (n <= 0) delete x[id]; else x[id] = n; return x; }),
    clearCart: () => setCart({}),
    toggleFav: (id) => setFavs(f => { const x = { ...f }; if (x[id]) delete x[id]; else x[id] = true; return x; }),
    isFav: (id) => !!favs[id],
    favList: () => Object.keys(favs).filter(id => favs[id]),
  };

  // ---- current screen ----
  let screen;
  if (top) {
    if (top.type === 'product') screen = <WFProduct ctx={ctx} params={top.params} />;
    else if (top.type === 'listing') screen = <WFListing ctx={ctx} params={top.params} />;
    else if (top.type === 'search') screen = <WFSearch ctx={ctx} />;
    else if (top.type === 'checkout') screen = <WFCheckout ctx={ctx} />;
    else if (top.type === 'order') screen = <WFOrder ctx={ctx} />;
    else if (top.type === 'addresses') screen = <WFAddresses ctx={ctx} />;
    else if (top.type === 'payments') screen = <WFPayments ctx={ctx} />;
    else if (top.type === 'notifications') screen = <WFNotifications ctx={ctx} />;
    else if (top.type === 'support') screen = <WFSupport ctx={ctx} />;
    else if (top.type === 'delivery-info') screen = <WFDeliveryInfo ctx={ctx} />;
    else if (top.type === 'return-info') screen = <WFReturnInfo ctx={ctx} />;
    else if (top.type === 'promo-rules') screen = <WFPromoRules ctx={ctx} />;
    else if (top.type === 'faq') screen = <WFFAQ ctx={ctx} />;
    else if (top.type === 'reviews') screen = <WFReviews ctx={ctx} />;
  } else {
    if (tab === 'home') screen = <WFHome ctx={ctx} />;
    else if (tab === 'categories') screen = <WFCategories ctx={ctx} />;
    else if (tab === 'cart') screen = <WFCart ctx={ctx} />;
    else if (tab === 'favorites') screen = <WFFavorites ctx={ctx} />;
    else if (tab === 'profile') screen = <WFProfile ctx={ctx} />;
  }

  const curKey = top ? top.type : tab;
  const hideNav = top && top.type === 'checkout';

  // ---- navigation ----
  const jump = (kind) => {
    if (['home', 'categories', 'cart', 'favorites', 'profile'].includes(kind)) { ctx.goTab(kind); return; }
    if (kind === 'product') { setStack([{ type: 'product', params: { id: 'p1' } }]); return; }
    if (kind === 'listing') { setStack([{ type: 'listing', params: { cat: 'dispos' } }]); return; }
    if (kind === 'search') { setStack([{ type: 'search', params: {} }]); return; }
    if (kind === 'checkout') { if (!Object.keys(cart).length) setCart({ p1: 1, p7: 2 }); setStack([{ type: 'checkout', params: {} }]); return; }
    if (kind === 'order') { setTab('profile'); setStack([{ type: 'order', params: {} }]); return; }
    if (kind === 'filter') { setStack([{ type: 'listing', params: { cat: 'dispos', openFilter: true } }]); return; }
    const profilePages = ['addresses','payments','notifications','support','delivery-info','return-info','promo-rules','faq','reviews'];
    if (profilePages.includes(kind)) { setTab('profile'); setStack([{ type: kind, params: {} }]); return; }
  };

  const MAP_TABS = WF_TABS;
  const MAP_SUB = [
    { key: 'product', label: 'Карточка товара', icon: 'tag' },
    { key: 'listing', label: 'Листинг категории', icon: 'grid' },
    { key: 'search', label: 'Поиск и фильтры', icon: 'search' },
    { key: 'filter', label: 'Настройки фильтра', icon: 'sliders' },
    { key: 'checkout', label: 'Оформление заказа', icon: 'card' },
    { key: 'order', label: 'Детали заказа', icon: 'box' },
  ];
  const MAP_PROFILE = [
    { key: 'addresses', label: 'Адреса доставки', icon: 'pin' },
    { key: 'payments', label: 'Способы оплаты', icon: 'card' },
    { key: 'notifications', label: 'Уведомления', icon: 'bell' },
    { key: 'support', label: 'Поддержка', icon: 'headset' },
    { key: 'delivery-info', label: 'О доставке', icon: 'truck' },
    { key: 'return-info', label: 'Возврат и обмен', icon: 'repeat' },
    { key: 'promo-rules', label: 'Правила акций', icon: 'tag' },
    { key: 'faq', label: 'FAQ', icon: 'search' },
    { key: 'reviews', label: 'Отзывы клиентов', icon: 'star' },
  ];
  const CMP_SECTIONS = [
    { key: 'cards', label: 'Карточки товара', icon: 'tag' },
    { key: 'price', label: 'Цена · Smart Cena', icon: 'spark' },
    { key: 'buttons', label: 'Кнопки', icon: 'plus' },
    { key: 'badges', label: 'Бейджи и чипы', icon: 'grid' },
    { key: 'inputs', label: 'Поля и поиск', icon: 'search' },
  ];

  const openComponents = () => setMapView('components');
  const closeComponents = () => setMapView('screens');

  return (
    <div id="wf-root">
      <div className="wf-body">

        {/* ---- phone stage (always mounted for scaling) ---- */}
        <div className="wf-stage" ref={stageRef}>
          <div id="wf-scale" ref={scaleRef}>
            <div className="wf-phone">
              <div className="wf-screen">
                <div className="wf-island" />
                <div className="wf-status">
                  <span>9:41</span>
                  <div className="wf-sig">
                    <div className="wf-bars"><i /><i /><i /><i /></div>
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M1 4.5C3 2.5 13 2.5 15 4.5M3 7c2-1.6 8-1.6 10 0M6 9.5c1-.8 3-.8 4 0" strokeLinecap="round" /></svg>
                    <div className="wf-batt"><i /></div>
                  </div>
                </div>
                <div key={curKey + homeVariant} className="wf-fade" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                  {screen}
                </div>
                {!hideNav && (
                  <div className="wf-nav">
                    {WF_TABS.map(t => (
                      <button key={t.key} className={(!top && tab === t.key) ? 'on' : ''} onClick={() => ctx.goTab(t.key)}>
                        <WFIcon name={t.icon} size={23} fill={t.key === 'favorites' && !top && tab === t.key} />
                        {t.key === 'cart' && cartCount > 0 && <span className="wf-nbadge">{cartCount}</span>}
                        <span>{t.label}</span>
                      </button>
                    ))}
                    <div className="wf-home-ind" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ---- components canvas overlay ---- */}
        {mapView === 'components' && (
          <div className="wf-canvas-host">
            <WFComponentsCanvas />
          </div>
        )}

        {/* ---- floating map (always visible) ---- */}
        <aside className="wf-floatmap">
          <div className="wf-fm-head">
            <span className="wf-fm-title">{mapView === 'screens' ? 'Карта экранов' : 'Компоненты'}</span>
            <span className="wf-fm-dot" />
          </div>
          <div className="wf-fm-seg">
            <button className={mapView === 'screens' ? 'on' : ''} onClick={closeComponents}>Экраны</button>
            <button className={mapView === 'components' ? 'on' : ''} onClick={openComponents}>Компоненты</button>
          </div>
          {mapView === 'screens' ? (
            <div className="wf-map">
              <div className="wf-grp">Вкладки</div>
              {MAP_TABS.map(t => (
                <button key={t.key} className={curKey === t.key ? 'on' : ''} onClick={() => jump(t.key)}>
                  <span className="wf-mi"><WFIcon name={t.icon} size={18} /></span>{t.label}
                </button>
              ))}
              <div className="wf-grp">Экраны</div>
              {MAP_SUB.map(t => (
                <button key={t.key} className={curKey === t.key ? 'on' : ''} onClick={() => jump(t.key)}>
                  <span className="wf-mi"><WFIcon name={t.icon} size={18} /></span>{t.label}
                </button>
              ))}
              <div className="wf-grp">Профиль</div>
              {MAP_PROFILE.map(t => (
                <button key={t.key} className={curKey === t.key ? 'on' : ''} onClick={() => jump(t.key)}>
                  <span className="wf-mi"><WFIcon name={t.icon} size={18} /></span>{t.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="wf-map">
              <div style={{ margin: '8px 12px 0', fontSize: 12, color: 'var(--faint)', lineHeight: 1.7 }}>
                Колесо — масштаб<br />Тащить фон — панорама<br />Клик на фрейм — фуллскрин
              </div>
            </div>
          )}
        </aside>

      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('wf-mount')).render(<WFApp />);
