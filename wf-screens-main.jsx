// ---- Shared bits + main tab screens ----
const { useState } = React;
const wfFmt = n => n.toLocaleString('pl-PL') + ' zł';

/* Reusable product card (grid or rail) */
function WFProductCard({ p, ctx, wide, smartMode }) {
  const qty = ctx.cart[p.id] || 0;
  const fav = ctx.isFav(p.id);
  const sm = smartMode || (p.smart ? 'list' : 'none');
  const smartRows = p.smart ? [p.smart[0], p.smart[2], p.smart[p.smart.length - 1]] : [];
  return (
    <div className="wf-pcard" onClick={() => ctx.navigate('product', { id: p.id })}
      style={wide ? null : null}>
      <div className="wf-pimg">
        {p.tag && <span className={'wf-tag' + (p.tag === 'Новинка' ? ' alt' : '')}>{p.tag}</span>}
        <button className={'wf-fav' + (fav ? ' on' : '')}
          onClick={e => { e.stopPropagation(); ctx.toggleFav(p.id); }}>
          <WFIcon name="heart" size={17} fill={fav} stroke={2} />
        </button>
        <WFImg ratio={1} radius={0} style={{ borderTop: 0, borderLeft: 0, borderRight: 0 }}
          glyph={p.cat === 'liquid' ? 'bottle' : p.cat === 'coil' || p.cat === 'cons' ? 'box' : 'device'} />
      </div>
      <div className="wf-pbody">
        <span className="wf-pbrand">{p.brand}</span>
        <span className="wf-pname">{p.name}</span>
        <span className="wf-pspec">{p.spec}</span>
        <div className="wf-prow">
          <span className="wf-price">{wfFmt(p.price)}{p.old && qty === 0 && <s>{wfFmt(p.old)}</s>}</span>
          {qty > 0 ? (
            <div className="wf-stepper" onClick={e => e.stopPropagation()}>
              <button onClick={() => ctx.setQty(p.id, qty - 1)}><WFIcon name="minus" size={16} /></button>
              <span>{qty}</span>
              <button onClick={() => ctx.setQty(p.id, qty + 1)}><WFIcon name="plus" size={16} /></button>
            </div>
          ) : (
            <button className="wf-add" onClick={e => { e.stopPropagation(); ctx.addToCart(p.id); }}>
              <WFIcon name="plus" size={18} />
            </button>
          )}
        </div>
        {sm === 'list' && p.smart && (
          <div className="wf-smart">
            <div className="wf-smart-h"><WFIcon name="tag" size={12} />Smart Cena</div>
            {smartRows.map(([q, pr]) => (
              <div className="wf-smart-row" key={q}><span>от {q} шт</span><b>{wfFmt(pr)}</b></div>
            ))}
          </div>
        )}
        {sm === 'chip' && p.smart && (
          <div className="wf-smart-chip"><WFIcon name="tag" size={12} />Smart Cena · до {wfFmt(p.smart[p.smart.length - 1][1])}</div>
        )}
      </div>
    </div>
  );
}

function WFSearchStub({ ctx, alt }) {
  return (
    <div className={'wf-searchbar' + (alt ? ' alt' : '')} onClick={() => ctx.navigate('search')}>
      <WFIcon name="search" size={18} />
      <span>Поиск устройств, жидкостей…</span>
    </div>
  );
}

function WFCatChips({ ctx, active }) {
  return (
    <div className="wf-chips">
      {WF_CATEGORIES.map(c => (
        <button key={c.key} className={'wf-pill' + (active === c.key ? ' on' : '')}
          onClick={() => ctx.navigate('listing', { cat: c.key })}>{c.name}</button>
      ))}
    </div>
  );
}

/* ===================== HOME (3 variants) ===================== */
function WFHome({ ctx }) {
  const v = ctx.homeVariant;
  const hits = WF_PRODUCTS.filter(p => p.tag === 'Хит' || p.tag === 'Топ');
  const fresh = WF_PRODUCTS.filter(p => p.tag === 'Новинка').concat(WF_PRODUCTS.slice(2, 5));

  return (
    <div className="wf-scroll">
      <div className="wf-head">
        <div>
          <div className="wf-h-title">Vapor<span style={{ color: 'var(--accent)' }}>.</span></div>
          <div className="wf-h-sub">Доставка сегодня · Варшава</div>
        </div>
        <div className="wf-spacer" />
        <button className="wf-circbtn" onClick={() => ctx.navigate('search')}><WFIcon name="search" size={20} /></button>
      </div>
      <div className="wf-pad" style={{ paddingTop: 0 }}>
        {/* ---------- Variant 1: rails ---------- */}
        {v === 1 && <>
          <WFSearchStub ctx={ctx} />
          <div style={{ marginTop: 14 }} className="wf-promo" onClick={() => ctx.navigate('listing', { cat: 'dispos' })}>
            <svg viewBox="0 0 24 24" className="wf-img-glyph"><WFIcon name="spark" /></svg>
            <h4>−20% на одноразки</h4>
            <p>Подборка недели · 12 устройств</p>
            <span className="wf-promo-cta">Смотреть</span>
          </div>
          <div className="wf-dots"><i className="on" /><i /><i /></div>
          <div style={{ marginTop: 16 }}><WFCatChips ctx={ctx} /></div>
          <div className="wf-section-title"><h3>Популярное</h3><span className="wf-more">Все<WFIcon name="fwd" size={14} /></span></div>
          <div className="wf-rail-h">{hits.map(p => <WFProductCard key={p.id} p={p} ctx={ctx} />)}</div>
          <div className="wf-section-title"><h3>Новинки</h3><span className="wf-more">Все<WFIcon name="fwd" size={14} /></span></div>
          <div className="wf-rail-h">{fresh.map(p => <WFProductCard key={p.id} p={p} ctx={ctx} />)}</div>
        </>}

        {/* ---------- Variant 2: showcase grid ---------- */}
        {v === 2 && <>
          <WFSearchStub ctx={ctx} alt />
          <div style={{ display: 'flex', gap: 10, marginTop: 14, alignItems: 'center', background: 'var(--accent-soft)', border: '1px dashed var(--accent)', borderRadius: 13, padding: '11px 14px' }}>
            <WFIcon name="tag" size={18} style={{ color: 'var(--accent)' }} />
            <span style={{ fontSize: 13, color: 'var(--text)' }}>Жидкости 3 по цене 2 — до воскресенья</span>
          </div>
          <div style={{ marginTop: 16 }}><WFCatChips ctx={ctx} /></div>
          <div className="wf-section-title"><h3>Витрина</h3><span className="wf-more">Фильтр<WFIcon name="filter" size={14} /></span></div>
          <div className="wf-grid">{WF_PRODUCTS.slice(0, 8).map(p => <WFProductCard key={p.id} p={p} ctx={ctx} />)}</div>
        </>}

        {/* ---------- Variant 3: categories-first ---------- */}
        {v === 3 && <>
          <WFSearchStub ctx={ctx} />
          <div className="wf-section-title"><h3>Категории</h3></div>
          <div className="wf-grid">
            {WF_CATEGORIES.map(c => (
              <div key={c.key} className="wf-cat-tile" onClick={() => ctx.navigate('listing', { cat: c.key })}>
                <span className="wf-count">{c.count}</span>
                <svg viewBox="0 0 60 60" className="wf-img-glyph" style={{ stroke: 'currentColor' }}>
                  {c.key === 'liquid' ? <path d="M26 12h8v4l3 6v26a3 3 0 0 1-3 3h-8a3 3 0 0 1-3-3V22l3-6z" /> :
                   c.key === 'coil' || c.key === 'cons' ? <path d="M30 12 46 20v20L30 48 14 40V20z" /> :
                   <rect x="24" y="10" width="12" height="40" rx="6" />}
                </svg>
                <div><b>{c.name}</b><br /><span>{c.sub}</span></div>
              </div>
            ))}
          </div>
          <div className="wf-section-title"><h3>Рекомендуем</h3><span className="wf-more">Все<WFIcon name="fwd" size={14} /></span></div>
          <div className="wf-rail-h">{hits.map(p => <WFProductCard key={p.id} p={p} ctx={ctx} />)}</div>
        </>}
      </div>
    </div>
  );
}

/* ===================== CATEGORIES ===================== */
function WFCategories({ ctx }) {
  return (
    <div className="wf-scroll">
      <div className="wf-head"><div className="wf-h-title">Категории</div></div>
      <div className="wf-pad" style={{ paddingTop: 0 }}>
        <WFSearchStub ctx={ctx} />
        <div className="wf-grid" style={{ marginTop: 16 }}>
          {WF_CATEGORIES.map(c => (
            <div key={c.key} className="wf-cat-tile" onClick={() => ctx.navigate('listing', { cat: c.key })}>
              <span className="wf-count">{c.count}</span>
              <svg viewBox="0 0 60 60" className="wf-img-glyph" style={{ stroke: 'currentColor' }}>
                {c.key === 'liquid' ? <path d="M26 12h8v4l3 6v26a3 3 0 0 1-3 3h-8a3 3 0 0 1-3-3V22l3-6z" /> :
                 c.key === 'coil' || c.key === 'cons' ? <path d="M30 12 46 20v20L30 48 14 40V20z" /> :
                 <rect x="24" y="10" width="12" height="40" rx="6" />}
              </svg>
              <div><b>{c.name}</b><br /><span>{c.sub}</span></div>
            </div>
          ))}
        </div>
        <div className="wf-section-title"><h3>Популярные бренды</h3></div>
        <div className="wf-chips">
          {['AeroLab', 'Nuvo', 'Volt', 'Vega', 'Aroma', 'Frutta'].map(b => (
            <button key={b} className="wf-pill">{b}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===================== CART ===================== */
function WFCart({ ctx }) {
  const ids = Object.keys(ctx.cart).filter(id => ctx.cart[id] > 0);
  if (!ids.length) return (
    <div className="wf-scroll">
      <div className="wf-head"><div className="wf-h-title">Корзина</div></div>
      <div className="wf-empty">
        <div className="wf-eicon"><WFIcon name="cart" size={34} /></div>
        <b>Корзина пуста</b>
        <p>Добавьте устройства или жидкости — оформим доставку на сегодня.</p>
        <button className="wf-btn" style={{ flex: 'none', padding: '0 26px' }} onClick={() => ctx.goTab('home')}>За покупками</button>
      </div>
    </div>
  );
  const subtotal = ids.reduce((s, id) => s + WF_PROD_MAP[id].price * ctx.cart[id], 0);
  const delivery = subtotal > 1500 ? 0 : 199;
  return (
    <div className="wf-scroll">
      <div className="wf-head"><div className="wf-h-title">Корзина</div><div className="wf-h-sub" style={{ marginLeft: 'auto' }}>{ids.length} тов.</div></div>
      <div className="wf-pad" style={{ paddingTop: 0, paddingBottom: 150 }}>
        {ids.map(id => {
          const p = WF_PROD_MAP[id]; const q = ctx.cart[id];
          return (
            <div className="wf-row" key={id}>
              <WFImg ratio={1} radius={13} glyph={p.cat === 'liquid' ? 'bottle' : 'device'} />
              <div className="wf-rbody" onClick={() => ctx.navigate('product', { id })}>
                <b>{p.name}</b><span>{p.brand} · {p.spec}</span>
                <div className="wf-price" style={{ marginTop: 6, fontSize: 14 }}>{wfFmt(p.price)}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
                <button className="wf-fav" style={{ position: 'static', background: 'transparent', border: 0 }}
                  onClick={() => ctx.setQty(id, 0)}><WFIcon name="trash" size={17} /></button>
                <div className="wf-stepper">
                  <button onClick={() => ctx.setQty(id, q - 1)}><WFIcon name="minus" size={16} /></button>
                  <span>{q}</span>
                  <button onClick={() => ctx.setQty(id, q + 1)}><WFIcon name="plus" size={16} /></button>
                </div>
              </div>
            </div>
          );
        })}
        <div className="wf-searchbar" style={{ marginTop: 16, cursor: 'default' }}>
          <WFIcon name="tag" size={18} /><span>Промокод</span>
          <button className="wf-pill on" style={{ marginLeft: 'auto', padding: '6px 14px' }}>Применить</button>
        </div>
        <div className="wf-block">
          <div className="wf-summary">
            <div className="wf-sumrow"><span>Товары ({ids.length})</span><span>{wfFmt(subtotal)}</span></div>
            <div className="wf-sumrow"><span>Доставка</span><span>{delivery ? wfFmt(delivery) : 'Бесплатно'}</span></div>
            <div className="wf-sumrow total"><span>Итого</span><span>{wfFmt(subtotal + delivery)}</span></div>
          </div>
        </div>
      </div>
      <div className="wf-sticky">
        <button className="wf-btn block" onClick={() => ctx.navigate('checkout')}>
          Оформить · {wfFmt(subtotal + delivery)}
        </button>
      </div>
    </div>
  );
}

/* ===================== FAVORITES ===================== */
function WFFavorites({ ctx }) {
  const ids = ctx.favList();
  return (
    <div className="wf-scroll">
      <div className="wf-head"><div className="wf-h-title">Избранное</div>{ids.length > 0 && <div className="wf-h-sub" style={{ marginLeft: 'auto' }}>{ids.length} тов.</div>}</div>
      {ids.length === 0 ? (
        <div className="wf-empty">
          <div className="wf-eicon"><WFIcon name="heart" size={34} /></div>
          <b>Пока пусто</b>
          <p>Отмечайте товары сердечком — они появятся здесь.</p>
          <button className="wf-btn" style={{ flex: 'none', padding: '0 26px' }} onClick={() => ctx.goTab('home')}>Найти товары</button>
        </div>
      ) : (
        <div className="wf-pad" style={{ paddingTop: 0 }}>
          <div className="wf-grid">{ids.map(id => <WFProductCard key={id} p={WF_PROD_MAP[id]} ctx={ctx} />)}</div>
        </div>
      )}
    </div>
  );
}

/* ===================== PROFILE ===================== */
function WFProfile({ ctx }) {
  return (
    <div className="wf-scroll">
      <div className="wf-head"><div className="wf-h-title">Профиль</div><div className="wf-spacer" /><button className="wf-circbtn"><WFIcon name="bell" size={20} /></button></div>
      <div className="wf-pad" style={{ paddingTop: 0 }}>
        <div className="wf-prof-head">
          <div className="wf-av"><WFIcon name="user" size={30} /></div>
          <div><b>Имя Фамилия</b><br /><span>+48 600 000 000</span></div>
          <div className="wf-spacer" />
          <button className="wf-circbtn"><WFIcon name="fwd" size={18} /></button>
        </div>
        <div className="wf-stats">
          <div className="wf-stat">
            <WFIcon name="box" size={22} style={{ color: 'var(--accent)', marginBottom: 6 }} />
            <b>12</b><span>заказов</span>
          </div>
          <div className="wf-stat">
            <WFIcon name="heart" size={22} style={{ color: 'var(--accent)', marginBottom: 6 }} />
            <b>{ctx.favList().length}</b><span>в избранном</span>
          </div>
          <div className="wf-stat">
            <WFIcon name="star" size={22} style={{ color: 'var(--accent)', marginBottom: 6 }} />
            <b>340</b><span>бонусов</span>
          </div>
        </div>
        <div className="wf-menu">
          <button onClick={() => ctx.navigate('order')}><span className="wf-mic"><WFIcon name="box" size={20} /></span>Мои заказы<span className="wf-spacer" /><span className="wf-mval">2 активных</span><WFIcon name="fwd" size={16} style={{ color: 'var(--faint)' }} /></button>
          <button onClick={() => ctx.navigate('addresses')}><span className="wf-mic"><WFIcon name="pin" size={20} /></span>Адреса доставки<span className="wf-spacer" /><WFIcon name="fwd" size={16} style={{ color: 'var(--faint)' }} /></button>
          <button onClick={() => ctx.navigate('payments')}><span className="wf-mic"><WFIcon name="card" size={20} /></span>Способы оплаты<span className="wf-spacer" /><WFIcon name="fwd" size={16} style={{ color: 'var(--faint)' }} /></button>
          <button onClick={() => ctx.navigate('notifications')}><span className="wf-mic"><WFIcon name="bell" size={20} /></span>Уведомления<span className="wf-spacer" /><WFIcon name="fwd" size={16} style={{ color: 'var(--faint)' }} /></button>
          <button onClick={() => ctx.navigate('support')}><span className="wf-mic"><WFIcon name="headset" size={20} /></span>Поддержка<span className="wf-spacer" /><WFIcon name="fwd" size={16} style={{ color: 'var(--faint)' }} /></button>
        </div>
        <div className="wf-menu" style={{ marginTop: 12 }}>
          <button onClick={() => ctx.navigate('delivery-info')}><span className="wf-mic"><WFIcon name="truck" size={20} /></span>О доставке<span className="wf-spacer" /><WFIcon name="fwd" size={16} style={{ color: 'var(--faint)' }} /></button>
          <button onClick={() => ctx.navigate('return-info')}><span className="wf-mic"><WFIcon name="repeat" size={20} /></span>Возврат и обмен<span className="wf-spacer" /><WFIcon name="fwd" size={16} style={{ color: 'var(--faint)' }} /></button>
          <button onClick={() => ctx.navigate('promo-rules')}><span className="wf-mic"><WFIcon name="tag" size={20} /></span>Правила акций<span className="wf-spacer" /><WFIcon name="fwd" size={16} style={{ color: 'var(--faint)' }} /></button>
          <button onClick={() => ctx.navigate('faq')}><span className="wf-mic"><WFIcon name="search" size={20} /></span>FAQ<span className="wf-spacer" /><WFIcon name="fwd" size={16} style={{ color: 'var(--faint)' }} /></button>
          <button onClick={() => ctx.navigate('reviews')}><span className="wf-mic"><WFIcon name="star" size={20} /></span>Отзывы клиентов<span className="wf-spacer" /><span className="wf-mval">4.8 ★</span><WFIcon name="fwd" size={16} style={{ color: 'var(--faint)' }} /></button>
        </div>
        <div className="wf-menu" style={{ marginTop: 12 }}>
          <button style={{ color: 'var(--dim)' }}><span style={{ color: 'var(--faint)' }}><WFIcon name="back" size={20} /></span>Выйти</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { WFProductCard, WFSearchStub, WFCatChips, wfFmt, WFHome, WFCategories, WFCart, WFFavorites, WFProfile });
