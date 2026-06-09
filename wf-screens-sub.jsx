// ---- Sub-screens: Product, Listing, Search/Filters, Checkout, Order ----

/* ===================== FILTER SHEET ===================== */
function WFFilterSheet({ ctx, onClose }) {
  const [nic, setNic] = useState('20 мг');
  const [sort, setSort] = useState('Популярные');
  const [subs, setSubs] = useState({});
  return (
    <div className="wf-sheet-wrap wf-fade">
      <div className="wf-sheet-bg" onClick={onClose} />
      <div className="wf-sheet">
        <div className="wf-sheet-grab" />
        <h3>Фильтры</h3>
        <div className="wf-label" style={{ marginTop: 0 }}>Подкатегория</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {WF_CATEGORIES.map(c => (
            <button key={c.key} className={'wf-pill' + (subs[c.key] ? ' on' : '')}
              onClick={() => setSubs(s => ({ ...s, [c.key]: !s[c.key] }))}>{c.name}</button>
          ))}
        </div>
        <div className="wf-label">Цена, zł</div>
        <div className="wf-range"><div className="wf-fill" /><div className="wf-knob" style={{ left: '18%' }} /><div className="wf-knob" style={{ left: '70%' }} /></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: 'var(--dim)' }}><span>190</span><span>2 400</span></div>
        <div className="wf-label">Крепость</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['0 мг', '12 мг', '20 мг', '50 мг'].map(n => (
            <button key={n} className={'wf-pill' + (nic === n ? ' on' : '')} onClick={() => setNic(n)}>{n}</button>
          ))}
        </div>
        <div className="wf-label">Сортировка</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['Популярные', 'Дешевле', 'Дороже', 'Новинки'].map(s => (
            <button key={s} className={'wf-pill' + (sort === s ? ' on' : '')} onClick={() => setSort(s)}>{s}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 22 }}>
          <button className="wf-btn ghost" onClick={onClose} style={{ flex: '0 0 38%' }}>Сбросить</button>
          <button className="wf-btn" onClick={onClose}>Показать 24</button>
        </div>
      </div>
    </div>
  );
}

/* ===================== LISTING ===================== */
function WFListing({ ctx, params }) {
  const cat = WF_CAT_MAP[params.cat] || WF_CATEGORIES[0];
  const [sort, setSort] = useState('Популярные');
  const [filter, setFilter] = useState(!!params.openFilter);
  let items = WF_PRODUCTS.filter(p => p.cat === cat.key);
  if (!items.length) items = WF_PRODUCTS;
  return (
    <div className="wf-scroll">
      <div className="wf-head">
        <button className="wf-circbtn" onClick={ctx.back}><WFIcon name="back" size={20} /></button>
        <div><div className="wf-h-title" style={{ fontSize: 19 }}>{cat.name}</div><div className="wf-h-sub">{items.length} товаров · {cat.sub}</div></div>
        <div className="wf-spacer" />
        <button className="wf-circbtn" onClick={() => setFilter(true)}><WFIcon name="filter" size={20} /></button>
      </div>
      <div className="wf-pad" style={{ paddingTop: 0 }}>
        <div className="wf-chips">
          {['Популярные', 'Дешевле', 'Дороже', 'Новинки'].map(s => (
            <button key={s} className={'wf-pill' + (sort === s ? ' on' : '')} onClick={() => setSort(s)}>{s}</button>
          ))}
        </div>
        <div className="wf-grid" style={{ marginTop: 14 }}>
          {items.map(p => <WFProductCard key={p.id} p={p} ctx={ctx} />)}
        </div>
      </div>
      {filter && <WFFilterSheet ctx={ctx} onClose={() => setFilter(false)} />}
    </div>
  );
}

/* ===================== SEARCH ===================== */
function WFSearch({ ctx }) {
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState(false);
  const recent = ['одноразка 8000', 'жидкость мята', 'зарядка USB-C'];
  const popular = ['Pod One', 'Salt Berry', 'Volt Mini', 'Mesh 0.6', 'Soft Case'];
  const results = q
    ? WF_PRODUCTS.filter(p => (p.name + p.brand).toLowerCase().includes(q.toLowerCase()))
    : WF_PRODUCTS.filter(p => p.tag === 'Хит' || p.tag === 'Топ');
  return (
    <div className="wf-scroll">
      <div className="wf-head" style={{ gap: 10 }}>
        <button className="wf-circbtn" onClick={ctx.back}><WFIcon name="back" size={20} /></button>
        <div className="wf-searchbar" style={{ flex: 1, padding: '11px 13px' }}>
          <WFIcon name="search" size={18} />
          <input className="wf-field" value={q} onChange={e => setQ(e.target.value)} autoFocus
            placeholder="Поиск товаров…"
            style={{ border: 0, background: 'transparent', padding: 0, margin: 0, flex: 1 }} />
          {q && <button className="wf-fav" style={{ position: 'static', background: 'transparent', border: 0 }} onClick={() => setQ('')}><WFIcon name="x" size={16} /></button>}
        </div>
        <button className="wf-circbtn" onClick={() => setFilter(true)}><WFIcon name="sliders" size={20} /></button>
      </div>
      <div className="wf-pad" style={{ paddingTop: 6 }}>
        {!q && <>
          <div className="wf-label" style={{ marginTop: 0 }}>Недавнее</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {recent.map(r => (
              <button key={r} className="wf-searchbar" style={{ background: 'transparent', border: 0, padding: '11px 2px', color: 'var(--dim)' }} onClick={() => setQ(r)}>
                <WFIcon name="clock" size={17} /><span style={{ flex: 1, textAlign: 'left' }}>{r}</span><WFIcon name="back" size={15} style={{ transform: 'rotate(45deg)' }} />
              </button>
            ))}
          </div>
          <div className="wf-label">Популярные запросы</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {popular.map(t => <button key={t} className="wf-pill" onClick={() => setQ(t)}>{t}</button>)}
          </div>
        </>}
        <div className="wf-section-title"><h3>{q ? `Результаты · ${results.length}` : 'Может понравиться'}</h3></div>
        <div className="wf-grid">{results.map(p => <WFProductCard key={p.id} p={p} ctx={ctx} />)}</div>
      </div>
      {filter && <WFFilterSheet ctx={ctx} onClose={() => setFilter(false)} />}
    </div>
  );
}

/* ===================== PRODUCT ===================== */
function WFProduct({ ctx, params }) {
  const p = WF_PROD_MAP[params.id] || WF_PRODUCTS[0];
  const [flavor, setFlavor] = useState(p.flavors[0]);
  const [slide, setSlide] = useState(0);
  const qty = ctx.cart[p.id] || 0;
  const fav = ctx.isFav(p.id);
  const similar = WF_PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 4);
  return (
    <React.Fragment>
    <div className="wf-scroll">
      <div className="wf-pad" style={{ paddingTop: 0, paddingBottom: 24 }}>
        <div className="wf-hero">
          <div className="wf-topfade">
            <button className="wf-circbtn" onClick={ctx.back}><WFIcon name="back" size={20} /></button>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="wf-circbtn"><WFIcon name="share" size={18} /></button>
              <button className={'wf-circbtn'} onClick={() => ctx.toggleFav(p.id)} style={fav ? { color: 'var(--accent)' } : null}><WFIcon name="heart" size={18} fill={fav} /></button>
            </div>
          </div>
          {p.tag && <span className="wf-tag" style={{ top: 64, left: 18 }}>{p.tag}</span>}
          <WFImg ratio={1} radius={0} glyph={p.cat === 'liquid' ? 'bottle' : p.cat === 'coil' || p.cat === 'cons' ? 'box' : 'device'} />
          <div className="wf-dots" style={{ position: 'absolute', bottom: 14, left: 0, right: 0 }}>
            {[0, 1, 2].map(i => <i key={i} className={i === slide ? 'on' : ''} onClick={() => setSlide(i)} style={{ cursor: 'pointer' }} />)}
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span className="wf-pbrand" style={{ fontSize: 13 }}>{p.brand}</span>
            <div className="wf-rating" style={{ marginLeft: 'auto' }}><WFIcon name="star" size={15} fill /><span>4.8</span><span className="wf-rcount">· 126</span></div>
          </div>
          <h2 style={{ margin: '4px 0 0', fontSize: 24, fontWeight: 700 }}>{p.name}</h2>
          <div className="wf-price" style={{ fontSize: 24, marginTop: 8 }}>{wfFmt(p.price)}{p.old && <s>{wfFmt(p.old)}</s>}</div>
        </div>

        <div className="wf-spec-chips">
          <div className="wf-spec"><span>{p.cat === 'liquid' ? 'Объём' : 'Ресурс'}</span><b>{p.spec.split('·')[0].trim()}</b></div>
          {p.spec.includes('·') && <div className="wf-spec"><span>Параметр</span><b>{p.spec.split('·')[1].trim()}</b></div>}
          <div className="wf-spec"><span>Наличие</span><b>На складе</b></div>
        </div>

        {p.smart && (
          <div className="wf-block wf-smart-full">
            <h4><WFIcon name="tag" size={18} style={{ color: 'var(--accent)' }} />Smart Cena<span className="wf-smart-sub">чем больше — тем выгоднее</span></h4>
            <div className="wf-tier-grid">
              {p.smart.map(([q, pr], i) => {
                const active = qty >= q && (i === p.smart.length - 1 || qty < p.smart[i + 1][0]);
                return (
                  <div className={'wf-tier' + (active ? ' on' : '')} key={q}>
                    <span>от {q} шт</span><b>{wfFmt(pr)}</b>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="wf-label">{p.cat === 'liquid' || p.cat === 'coil' ? 'Вариант' : 'Цвет / вкус'}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {p.flavors.map(f => (
            <button key={f} className={'wf-pill' + (flavor === f ? ' on' : '')} onClick={() => setFlavor(f)}>{f}</button>
          ))}
        </div>

        <div className="wf-label">Описание</div>
        <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: 'var(--dim)' }}>
          Краткое описание устройства: характеристики, комплектация и совместимость. Здесь будет реальный текст из каталога.
        </p>
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {['Гарантия 14 дней', 'Доставка сегодня от 1 500 zł', 'Оригинальная продукция'].map(t => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, color: 'var(--dim)' }}>
              <WFIcon name="check" size={16} style={{ color: 'var(--accent)' }} />{t}
            </div>
          ))}
        </div>

        <div className="wf-section-title"><h3>Похожие товары</h3></div>
        <div className="wf-rail-h">{similar.map(s => <WFProductCard key={s.id} p={s} ctx={ctx} />)}</div>
      </div>
    </div>

      <div className="wf-actionbar">
        {qty > 0 ? (
          <React.Fragment>
            <div className="wf-stepper" style={{ height: 52, borderRadius: 15 }}>
              <button style={{ width: 44 }} onClick={() => ctx.setQty(p.id, qty - 1)}><WFIcon name="minus" size={18} /></button>
              <span style={{ minWidth: 26, fontSize: 17 }}>{qty}</span>
              <button style={{ width: 44 }} onClick={() => ctx.setQty(p.id, qty + 1)}><WFIcon name="plus" size={18} /></button>
            </div>
            <button className="wf-btn" onClick={() => ctx.goTab('cart')}>В корзину · {wfFmt(p.price * qty)}</button>
          </React.Fragment>
        ) : (
          <button className="wf-btn block" onClick={() => ctx.addToCart(p.id)}><WFIcon name="cart" size={20} />Добавить в корзину</button>
        )}
      </div>
    </React.Fragment>
  );
}

/* ===================== CHECKOUT ===================== */
function WFCheckout({ ctx }) {
  const [method, setMethod] = useState('courier');
  const [pay, setPay] = useState('card');
  const [done, setDone] = useState(false);
  const ids = Object.keys(ctx.cart).filter(id => ctx.cart[id] > 0);
  const subtotal = ids.reduce((s, id) => s + WF_PROD_MAP[id].price * ctx.cart[id], 0);
  const delivery = method === 'pickup' ? 0 : (subtotal > 1500 ? 0 : 199);

  if (done) return (
    <div className="wf-scroll">
      <div className="wf-empty" style={{ paddingTop: 120 }}>
        <div className="wf-eicon" style={{ borderStyle: 'solid', borderColor: 'var(--accent)', color: 'var(--accent)' }}><WFIcon name="check" size={40} /></div>
        <b>Заказ оформлен</b>
        <p>Заказ №1043 принят. Курьер привезёт сегодня в течение 2 часов.</p>
        <button className="wf-btn" style={{ flex: 'none', padding: '0 26px' }} onClick={() => { ctx.clearCart(); ctx.navigate('order'); }}>Отследить заказ</button>
        <button className="wf-pill" style={{ marginTop: 4 }} onClick={() => { ctx.clearCart(); ctx.goTab('home'); }}>На главную</button>
      </div>
    </div>
  );

  return (
    <div className="wf-scroll">
      <div className="wf-head">
        <button className="wf-circbtn" onClick={ctx.back}><WFIcon name="back" size={20} /></button>
        <div className="wf-h-title" style={{ fontSize: 19 }}>Оформление</div>
      </div>
      <div className="wf-pad" style={{ paddingTop: 0, paddingBottom: 130 }}>
        <div className="wf-block">
          <h4><WFIcon name="truck" size={18} style={{ color: 'var(--accent)' }} />Способ получения</h4>
          <div className={'wf-opt' + (method === 'courier' ? ' on' : '')} onClick={() => setMethod('courier')}>
            <div className="wf-radio" /><div className="wf-obody"><b>Курьер</b><span>Сегодня, 2–3 часа</span></div><span className="wf-oprice">{subtotal > 1500 ? '0 zł' : '199 zł'}</span>
          </div>
          <div className={'wf-opt' + (method === 'pickup' ? ' on' : '')} onClick={() => setMethod('pickup')}>
            <div className="wf-radio" /><div className="wf-obody"><b>Самовывоз</b><span>3 точки рядом · сегодня</span></div><span className="wf-oprice">0 zł</span>
          </div>
        </div>

        {method === 'courier' && (
          <div className="wf-block">
            <h4><WFIcon name="pin" size={18} style={{ color: 'var(--accent)' }} />Адрес</h4>
            <input className="wf-field" placeholder="Улица, дом" />
            <div style={{ display: 'flex', gap: 10 }}>
              <input className="wf-field" placeholder="Кв." style={{ flex: 1 }} />
              <input className="wf-field" placeholder="Этаж" style={{ flex: 1 }} />
            </div>
            <input className="wf-field" placeholder="Комментарий курьеру" style={{ marginBottom: 0 }} />
          </div>
        )}

        <div className="wf-block">
          <h4><WFIcon name="clock" size={18} style={{ color: 'var(--accent)' }} />Время</h4>
          <div className="wf-chips" style={{ flexWrap: 'wrap' }}>
            {['Как можно скорее', 'К 18:00', 'К 20:00', 'Завтра утром'].map((t, i) => (
              <button key={t} className={'wf-pill' + (i === 0 ? ' on' : '')}>{t}</button>
            ))}
          </div>
        </div>

        <div className="wf-block">
          <h4><WFIcon name="card" size={18} style={{ color: 'var(--accent)' }} />Оплата</h4>
          {[['card', 'Картой онлайн', '•••• 4290'], ['cash', 'Наличными курьеру', 'при получении'], ['sbp', 'СБП', 'по QR-коду']].map(([k, t, s]) => (
            <div key={k} className={'wf-opt' + (pay === k ? ' on' : '')} onClick={() => setPay(k)}>
              <div className="wf-radio" /><div className="wf-obody"><b>{t}</b><span>{s}</span></div>
            </div>
          ))}
        </div>

        <div className="wf-block">
          <h4>Состав заказа</h4>
          <div className="wf-summary">
            {ids.slice(0, 3).map(id => (
              <div className="wf-sumrow" key={id}><span>{WF_PROD_MAP[id].name} × {ctx.cart[id]}</span><span>{wfFmt(WF_PROD_MAP[id].price * ctx.cart[id])}</span></div>
            ))}
            {ids.length > 3 && <div className="wf-sumrow"><span>ещё {ids.length - 3}…</span><span /></div>}
            <div className="wf-sumrow"><span>Доставка</span><span>{delivery ? wfFmt(delivery) : 'Бесплатно'}</span></div>
            <div className="wf-sumrow total"><span>Итого</span><span>{wfFmt(subtotal + delivery)}</span></div>
          </div>
        </div>
      </div>
      <div className="wf-sticky">
        <button className="wf-btn block" onClick={() => setDone(true)}>Подтвердить · {wfFmt(subtotal + delivery)}</button>
      </div>
    </div>
  );
}

/* ===================== ORDER (details in profile) ===================== */
function WFOrder({ ctx }) {
  const items = WF_PRODUCTS.slice(0, 3);
  const total = items.reduce((s, p) => s + p.price, 0) ;
  const steps = [
    ['done', 'Оформлен', 'Сегодня, 14:02'],
    ['done', 'Собран', 'Сегодня, 14:20'],
    ['cur', 'В пути', 'Курьер выехал · ~30 мин'],
    ['', 'Доставлен', 'Ожидается к 16:00'],
  ];
  return (
    <div className="wf-scroll">
      <div className="wf-head">
        <button className="wf-circbtn" onClick={ctx.back}><WFIcon name="back" size={20} /></button>
        <div><div className="wf-h-title" style={{ fontSize: 19 }}>Заказ №1043</div><div className="wf-h-sub">от 3 июня · 3 товара</div></div>
        <div className="wf-spacer" />
        <span className="wf-pill on" style={{ pointerEvents: 'none' }}>В пути</span>
      </div>
      <div className="wf-pad" style={{ paddingTop: 0 }}>
        <div className="wf-block">
          <h4>Статус доставки</h4>
          <div className="wf-track">
            {steps.map(([st, t, s], i) => (
              <div key={i} className={'wf-tstep ' + st}>
                <div className="wf-tdot">{st === 'done' && <WFIcon name="check" size={13} />}</div>
                <div className="wf-tbody"><b>{t}</b><span>{s}</span></div>
              </div>
            ))}
          </div>
        </div>

        <div className="wf-block">
          <h4>Состав</h4>
          {items.map(p => (
            <div className="wf-row" key={p.id} style={{ padding: '10px 0' }}>
              <WFImg ratio={1} radius={11} glyph={p.cat === 'liquid' ? 'bottle' : 'device'} style={{ width: 52, height: 52 }} />
              <div className="wf-rbody"><b>{p.name}</b><span>{p.brand} · 1 шт</span></div>
              <span className="wf-price" style={{ fontSize: 14 }}>{wfFmt(p.price)}</span>
            </div>
          ))}
          <div className="wf-summary" style={{ marginTop: 12 }}>
            <div className="wf-sumrow"><span>Доставка</span><span>Бесплатно</span></div>
            <div className="wf-sumrow total"><span>Итого</span><span>{wfFmt(total)}</span></div>
          </div>
        </div>

        <div className="wf-block">
          <h4><WFIcon name="pin" size={18} style={{ color: 'var(--accent)' }} />Доставка</h4>
          <div style={{ fontSize: 13.5, color: 'var(--dim)', lineHeight: 1.6 }}>
            Курьер · ул. Маршалковская, 12, кв. 34<br />Оплачено картой •••• 4290
          </div>
        </div>

        <button className="wf-btn ghost block" style={{ marginTop: 14 }}><WFIcon name="repeat" size={18} />Повторить заказ</button>

        <div className="wf-section-title"><h3>История</h3></div>
        <div className="wf-block" style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: 13 }}>
          <WFImg ratio={1} radius={11} glyph="device" style={{ width: 46, height: 46 }} />
          <div className="wf-rbody"><b>Заказ №1028</b><span style={{ color: 'var(--dim)', fontSize: 12 }}>28 мая · доставлен · {wfFmt(1340)}</span></div>
          <WFIcon name="fwd" size={16} style={{ color: 'var(--faint)' }} />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { WFListing, WFSearch, WFProduct, WFCheckout, WFOrder, WFFilterSheet });
