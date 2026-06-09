// ---- Profile sub-screens + Info pages ----

/* ====== Shared sub-screen header ====== */
function WFSubHead({ ctx, title, sub }) {
  return (
    <div className="wf-head">
      <button className="wf-circbtn" onClick={ctx.back}><WFIcon name="back" size={20} /></button>
      <div><div className="wf-h-title" style={{ fontSize: 19 }}>{title}</div>{sub && <div className="wf-h-sub">{sub}</div>}</div>
    </div>
  );
}

/* ====== Toggle component ====== */
function WFToggle({ on }) {
  return (
    <div style={{
      width: 44, height: 26, borderRadius: 13, flexShrink: 0, cursor: 'pointer',
      background: on ? 'var(--accent)' : 'var(--surface-3)',
      border: '1px solid ' + (on ? 'var(--accent)' : 'var(--line-2)'),
      position: 'relative', transition: 'background .2s'
    }}>
      <div style={{
        position: 'absolute', top: 3, left: on ? 20 : 3,
        width: 18, height: 18, borderRadius: 9,
        background: on ? 'var(--accent-ink)' : 'var(--dim)',
        transition: 'left .2s'
      }} />
    </div>
  );
}

/* ====== ADDRESSES ====== */
function WFAddresses({ ctx }) {
  const addrs = [
    { id: 1, name: 'Дом', street: 'ул. Маршалковская, 12, кв. 34', city: 'Варшава, 00-001', primary: true },
    { id: 2, name: 'Работа', street: 'пр. Иерусалимский, 65', city: 'Варшава, 00-697', primary: false },
  ];
  return (
    <div className="wf-scroll">
      <WFSubHead ctx={ctx} title="Адреса доставки" />
      <div className="wf-pad" style={{ paddingTop: 0, paddingBottom: 100 }}>
        {addrs.map(a => (
          <div key={a.id} className="wf-block" style={{ marginTop: 12, display: 'flex', alignItems: 'flex-start', gap: 13 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--surface-2)', border: '1px solid var(--line)', display: 'grid', placeItems: 'center', flexShrink: 0, color: a.primary ? 'var(--accent)' : 'var(--dim)' }}>
              <WFIcon name="pin" size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <b style={{ fontSize: 15 }}>{a.name}</b>
                {a.primary && <span className="wf-tag" style={{ position: 'static', fontSize: 10 }}>Основной</span>}
              </div>
              <div style={{ fontSize: 13.5, color: 'var(--dim)', marginTop: 3, lineHeight: 1.4 }}>{a.street}<br />{a.city}</div>
            </div>
            <button className="wf-circbtn" style={{ flexShrink: 0 }}><WFIcon name="fwd" size={16} /></button>
          </div>
        ))}
        <button className="wf-btn ghost block" style={{ marginTop: 16 }}><WFIcon name="plus" size={18} />Добавить адрес</button>
      </div>
    </div>
  );
}

/* ====== PAYMENTS ====== */
function WFPayments({ ctx }) {
  const methods = [
    { id: 1, label: 'Visa •••• 4290', sub: 'Действует до 09/27', icon: 'card', primary: true },
    { id: 2, label: 'Mastercard •••• 1147', sub: 'Действует до 04/26', icon: 'card', primary: false },
    { id: 3, label: 'BLIK', sub: 'Польский мобильный платёж', icon: 'spark', primary: false },
  ];
  return (
    <div className="wf-scroll">
      <WFSubHead ctx={ctx} title="Способы оплаты" />
      <div className="wf-pad" style={{ paddingTop: 0, paddingBottom: 100 }}>
        {methods.map(m => (
          <div key={m.id} className="wf-block" style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 13 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--surface-2)', border: '1px solid var(--line)', display: 'grid', placeItems: 'center', flexShrink: 0, color: m.primary ? 'var(--accent)' : 'var(--dim)' }}>
              <WFIcon name={m.icon} size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <b style={{ fontSize: 14, display: 'block' }}>{m.label}</b>
              <span style={{ fontSize: 12, color: 'var(--dim)' }}>{m.sub}</span>
            </div>
            {m.primary && <span className="wf-tag" style={{ position: 'static', fontSize: 10 }}>Основная</span>}
            <button className="wf-circbtn" style={{ flexShrink: 0, width: 32, height: 32 }}><WFIcon name="x" size={14} /></button>
          </div>
        ))}
        <button className="wf-btn ghost block" style={{ marginTop: 16 }}><WFIcon name="plus" size={18} />Добавить карту</button>
      </div>
    </div>
  );
}

/* ====== NOTIFICATIONS ====== */
function WFNotifications({ ctx }) {
  const [settings, setSettings] = useState({ push: true, email: true, sms: false, promos: true, orders: true, news: false });
  const toggle = k => setSettings(s => ({ ...s, [k]: !s[k] }));
  const rows = [
    { k: 'orders', label: 'Статус заказа', sub: 'Сборка, отправка, доставка' },
    { k: 'promos', label: 'Акции и скидки', sub: 'Smart Cena, сезонные распродажи' },
    { k: 'news', label: 'Новинки', sub: 'Новые товары в каталоге' },
  ];
  const channels = [
    { k: 'push', label: 'Push-уведомления', sub: 'В приложении' },
    { k: 'email', label: 'Email', sub: 'На указанный адрес' },
    { k: 'sms', label: 'SMS', sub: 'На номер телефона' },
  ];
  return (
    <div className="wf-scroll">
      <WFSubHead ctx={ctx} title="Уведомления" />
      <div className="wf-pad" style={{ paddingTop: 0 }}>
        <div className="wf-label" style={{ marginTop: 8 }}>О чём уведомлять</div>
        <div className="wf-menu">
          {rows.map(r => (
            <button key={r.k} onClick={() => toggle(r.k)} style={{ justifyContent: 'space-between' }}>
              <span className="wf-mic"><WFIcon name="bell" size={20} /></span>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{r.label}</div>
                <div style={{ fontSize: 12, color: 'var(--dim)', marginTop: 1 }}>{r.sub}</div>
              </div>
              <WFToggle on={settings[r.k]} />
            </button>
          ))}
        </div>
        <div className="wf-label">Каналы</div>
        <div className="wf-menu">
          {channels.map(c => (
            <button key={c.k} onClick={() => toggle(c.k)} style={{ justifyContent: 'space-between' }}>
              <span className="wf-mic"><WFIcon name={c.k === 'push' ? 'bell' : c.k === 'email' ? 'share' : 'headset'} size={20} /></span>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{c.label}</div>
                <div style={{ fontSize: 12, color: 'var(--dim)', marginTop: 1 }}>{c.sub}</div>
              </div>
              <WFToggle on={settings[c.k]} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ====== SUPPORT ====== */
function WFSupport({ ctx }) {
  const topics = ['Статус заказа', 'Возврат товара', 'Проблема с оплатой', 'Smart Cena', 'Другое'];
  return (
    <div className="wf-scroll">
      <WFSubHead ctx={ctx} title="Поддержка" sub="Онлайн · до 5 мин" />
      <div className="wf-pad" style={{ paddingTop: 0, paddingBottom: 90 }}>
        <div className="wf-block" style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 13 }}>
          <div style={{ width: 44, height: 44, borderRadius: 13, background: 'var(--accent-soft)', border: '1px solid var(--accent)', display: 'grid', placeItems: 'center', color: 'var(--accent)', flexShrink: 0 }}>
            <WFIcon name="headset" size={22} />
          </div>
          <div>
            <b style={{ fontSize: 15 }}>Онлайн-чат</b>
            <div style={{ fontSize: 12.5, color: 'var(--dim)', marginTop: 2 }}>Среднее время ответа — 3 мин</div>
          </div>
          <span className="wf-tag" style={{ position: 'static', marginLeft: 'auto' }}>Онлайн</span>
        </div>
        <div className="wf-label" style={{ marginTop: 20 }}>Популярные темы</div>
        <div className="wf-menu">
          {topics.map(t => (
            <button key={t}>
              <span className="wf-mic"><WFIcon name="chev" size={18} /></span>
              {t}<span className="wf-spacer" /><WFIcon name="fwd" size={16} style={{ color: 'var(--faint)' }} />
            </button>
          ))}
        </div>
        <div className="wf-label" style={{ marginTop: 20 }}>Или напишите сами</div>
        <textarea className="wf-field" placeholder="Опишите проблему…" rows={4} style={{ resize: 'none', lineHeight: 1.5 }} />
      </div>
      <div className="wf-sticky">
        <button className="wf-btn block"><WFIcon name="share" size={18} />Начать чат</button>
      </div>
    </div>
  );
}

/* ====== DELIVERY INFO ====== */
function WFDeliveryInfo({ ctx }) {
  const zones = [
    { name: 'Варшава', time: '2–3 часа', price: 'Бесплатно от 1 500 zł, иначе 199 zł' },
    { name: 'Краков, Гданьск', time: 'Следующий день', price: 'От 299 zł' },
    { name: 'Вся Польша', time: '1–3 дня (InPost)', price: 'От 299 zł' },
  ];
  return (
    <div className="wf-scroll">
      <WFSubHead ctx={ctx} title="Доставка" sub="Способы и зоны" />
      <div className="wf-pad" style={{ paddingTop: 0 }}>
        <div className="wf-block" style={{ marginTop: 12 }}>
          <h4><WFIcon name="truck" size={18} style={{ color: 'var(--accent)' }} />Курьер</h4>
          {zones.map(z => (
            <div key={z.name} className="wf-row" style={{ padding: '11px 0' }}>
              <WFIcon name="pin" size={18} style={{ color: 'var(--faint)', flexShrink: 0 }} />
              <div className="wf-rbody"><b>{z.name}</b><span>{z.time} · {z.price}</span></div>
            </div>
          ))}
        </div>
        <div className="wf-block">
          <h4><WFIcon name="box" size={18} style={{ color: 'var(--accent)' }} />Самовывоз</h4>
          <p style={{ margin: '4px 0 0', fontSize: 13.5, color: 'var(--dim)', lineHeight: 1.55 }}>
            3 пункта в Варшаве: Маршалковская 12, Новый Свет 18, Красиньского 4. Время работы: 9:00–21:00. Бесплатно.
          </p>
        </div>
        <div className="wf-block">
          <h4><WFIcon name="clock" size={18} style={{ color: 'var(--accent)' }} />Экспресс-доставка</h4>
          <p style={{ margin: '4px 0 0', fontSize: 13.5, color: 'var(--dim)', lineHeight: 1.55 }}>
            Доступна в Варшаве при заказе до 20:00. Доставим в течение 1 часа. Стоимость 399 zł.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ====== RETURN INFO ====== */
function WFReturnInfo({ ctx }) {
  const points = [
    { icon: 'clock', title: '14 дней', body: 'Срок возврата с момента получения заказа.' },
    { icon: 'check', title: 'Условия', body: 'Товар без следов использования, в оригинальной упаковке.' },
    { icon: 'repeat', title: 'Обмен', body: 'Обменять на другой цвет/вкус можно в течение 7 дней.' },
    { icon: 'card', title: 'Возврат средств', body: 'Деньги возвращаются на карту в течение 5 рабочих дней.' },
  ];
  return (
    <div className="wf-scroll">
      <WFSubHead ctx={ctx} title="Возврат и обмен" />
      <div className="wf-pad" style={{ paddingTop: 0 }}>
        {points.map(p => (
          <div key={p.title} className="wf-block" style={{ marginTop: 12, display: 'flex', gap: 13, alignItems: 'flex-start' }}>
            <div style={{ width: 36, height: 36, borderRadius: 11, background: 'var(--accent-soft)', border: '1px solid var(--accent)', display: 'grid', placeItems: 'center', color: 'var(--accent)', flexShrink: 0 }}>
              <WFIcon name={p.icon} size={18} />
            </div>
            <div><b style={{ fontSize: 14 }}>{p.title}</b><p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--dim)', lineHeight: 1.5 }}>{p.body}</p></div>
          </div>
        ))}
        <div className="wf-block" style={{ marginTop: 12 }}>
          <h4><WFIcon name="headset" size={18} style={{ color: 'var(--accent)' }} />Как оформить</h4>
          <p style={{ margin: '4px 0 0', fontSize: 13.5, color: 'var(--dim)', lineHeight: 1.55 }}>
            Напишите в поддержку или оформите возврат в разделе «Мои заказы». Мы пришлём курьера бесплатно.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ====== PROMO RULES ====== */
function WFPromoRules({ ctx }) {
  const promos = [
    { icon: 'tag', title: 'Smart Cena', body: 'Оптовая цена применяется автоматически при добавлении нужного количества товара в корзину. Скидка не суммируется с промокодами.' },
    { icon: 'spark', title: 'Сезонные распродажи', body: 'Проводятся 4 раза в год. Скидки до 40% на выбранные категории. Даты анонсируются заранее в push-уведомлениях.' },
    { icon: 'star', title: 'Промокоды', body: 'Применяются в корзине. Один промокод на заказ. Нельзя совмещать с Smart Cena и распродажами.' },
    { icon: 'repeat', title: 'Бонусная программа', body: '1 zł = 1 бонус. Бонусы можно использовать при следующем заказе (1 бонус = 0.1 zł). Срок действия — 12 месяцев.' },
  ];
  return (
    <div className="wf-scroll">
      <WFSubHead ctx={ctx} title="Правила акций" />
      <div className="wf-pad" style={{ paddingTop: 0 }}>
        {promos.map(p => (
          <div key={p.title} className="wf-block" style={{ marginTop: 12 }}>
            <h4><WFIcon name={p.icon} size={18} style={{ color: 'var(--accent)' }} />{p.title}</h4>
            <p style={{ margin: '4px 0 0', fontSize: 13.5, color: 'var(--dim)', lineHeight: 1.6 }}>{p.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ====== FAQ ====== */
function WFFAQ({ ctx }) {
  const [open, setOpen] = useState(null);
  const items = [
    { q: 'Как работает Smart Cena?', a: 'Чем больше единиц одного товара вы добавляете в корзину, тем ниже цена за штуку. Ступени видны прямо в карточке товара.' },
    { q: 'Можно ли вернуть одноразку?', a: 'Да, в течение 14 дней при условии, что устройство не использовалось и находится в оригинальной упаковке.' },
    { q: 'Когда будет доставлен мой заказ?', a: 'По Варшаве — в течение 2–3 часов. В другие города Польши — 1–3 рабочих дня через InPost.' },
    { q: 'Как применить промокод?', a: 'В разделе «Корзина» нажмите поле «Промокод», введите код и нажмите «Применить». Скидка применится автоматически.' },
    { q: 'Как накапливаются бонусы?', a: 'С каждого заказа вы получаете бонусы: 1 zł = 1 бонус. Их можно тратить при следующей покупке.' },
    { q: 'Есть ли минимальная сумма заказа?', a: 'Нет минимума. Бесплатная доставка по Варшаве при заказе от 1 500 zł.' },
  ];
  return (
    <div className="wf-scroll">
      <WFSubHead ctx={ctx} title="FAQ" sub="Частые вопросы" />
      <div className="wf-pad" style={{ paddingTop: 0 }}>
        {items.map((item, i) => (
          <div key={i} className="wf-block" style={{ marginTop: 12, cursor: 'pointer' }} onClick={() => setOpen(open === i ? null : i)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <b style={{ fontSize: 14, flex: 1, lineHeight: 1.3 }}>{item.q}</b>
              <WFIcon name={open === i ? 'chevd' : 'chev'} size={18} style={{ color: 'var(--faint)', flexShrink: 0 }} />
            </div>
            {open === i && <p style={{ margin: '10px 0 0', fontSize: 13.5, color: 'var(--dim)', lineHeight: 1.6 }}>{item.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ====== REVIEWS ====== */
function WFReviews({ ctx }) {
  const reviews = [
    { name: 'Алексей К.', rating: 5, date: '3 июня', text: 'Быстрая доставка, товар как описан. Пользуюсь Smart Cena — реально выгодно при оптовых закупках.', product: 'Pod One 6000' },
    { name: 'Marta W.', rating: 5, date: '1 июня', text: 'Заказывала жидкости — пришли в тот же день. Упаковка аккуратная, всё целое. Буду заказывать ещё.', product: 'Salt Berry 30' },
    { name: 'Дмитрий Л.', rating: 4, date: '29 мая', text: 'Хороший магазин, но хотелось бы больше вариантов крепости для жидкостей.', product: 'Ice Mint 30' },
    { name: 'Anna P.', rating: 5, date: '27 мая', text: 'Отличный сервис! Чат поддержки ответил за 2 минуты и помог с подбором устройства.', product: 'Volt Mini' },
  ];
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  return (
    <div className="wf-scroll">
      <WFSubHead ctx={ctx} title="Отзывы" sub={`${reviews.length} отзыва · ${avg} ★`} />
      <div className="wf-pad" style={{ paddingTop: 0 }}>
        <div className="wf-block" style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 42, fontWeight: 700, lineHeight: 1 }}>{avg}</div>
            <div className="wf-rating" style={{ justifyContent: 'center', marginTop: 6 }}>
              {[1,2,3,4,5].map(i => <WFIcon key={i} name="star" size={16} fill={i <= Math.round(avg)} />)}
            </div>
            <div style={{ fontSize: 12, color: 'var(--dim)', marginTop: 4 }}>{reviews.length} отзыва</div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[5,4,3,2,1].map(s => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12, color: 'var(--dim)', width: 10 }}>{s}</span>
                <div style={{ flex: 1, height: 5, borderRadius: 3, background: 'var(--surface-2)' }}>
                  <div style={{ height: '100%', borderRadius: 3, background: 'var(--accent)', width: s === 5 ? '75%' : s === 4 ? '20%' : '5%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {reviews.map((r, i) => (
          <div key={i} className="wf-block" style={{ marginTop: 12 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 11 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--surface-2)', display: 'grid', placeItems: 'center', color: 'var(--faint)', flexShrink: 0 }}>
                <WFIcon name="user" size={18} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <b style={{ fontSize: 14 }}>{r.name}</b>
                  <span style={{ fontSize: 11.5, color: 'var(--faint)', marginLeft: 'auto' }}>{r.date}</span>
                </div>
                <div className="wf-rating" style={{ marginTop: 3 }}>
                  {[1,2,3,4,5].map(s => <WFIcon key={s} name="star" size={13} fill={s <= r.rating} />)}
                  <span style={{ fontSize: 11.5, color: 'var(--faint)', marginLeft: 6 }}>{r.product}</span>
                </div>
              </div>
            </div>
            <p style={{ margin: '10px 0 0', fontSize: 13.5, color: 'var(--dim)', lineHeight: 1.55 }}>{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { WFAddresses, WFPayments, WFNotifications, WFSupport, WFDeliveryInfo, WFReturnInfo, WFPromoRules, WFFAQ, WFReviews });
