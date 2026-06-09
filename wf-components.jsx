// ---- Components library on a Figma-like canvas + full "Smart Cena" card ----

/* Full promo-style card matching the reference (image, discount, full tier list, CTA) */
function WFSmartCard({ p, ctx }) {
  const disc = p.old ? Math.round((1 - p.price / p.old) * 100) : 44;
  return (
    <div className="wf-smartcard">
      <div className="wf-sc-img">
        <WFImg ratio={1} radius={0} style={{ border: 0, height: '100%' }}
          glyph={p.cat === 'liquid' ? 'bottle' : 'device'} />
        <span className="wf-sc-disc">−{disc}%</span>
      </div>
      <div className="wf-sc-body">
        <div className="wf-sc-name">{p.name}</div>
        <div className="wf-sc-price"><s>{wfFmt(p.old || Math.round(p.price * 1.4))}</s><b>{wfFmt(p.price)}</b></div>
        <div className="wf-sc-div" />
        <div className="wf-sc-smart">Smart Cena</div>
        <div className="wf-sc-tiers">
          {p.smart.map(([q, pr]) => (
            <div className="wf-sc-tier" key={q}><span>от {q} шт</span><span>–</span><span>{wfFmt(pr)}</span></div>
          ))}
        </div>
        <button className="wf-btn block" style={{ marginTop: 16 }}
          onClick={() => ctx.navigate('product', { id: p.id })}>Выбрать</button>
      </div>
    </div>
  );
}

/* Frame inside an artboard: dark stage + caption (purpose) */
function WFCmpFrame({ purpose, children, align }) {
  return (
    <div className="wf-cmp-frame">
      <div className="wf-cmp-stage" style={{ alignItems: align || 'center' }}>
        <div style={{ width: '100%' }}>{children}</div>
      </div>
      <div className="wf-cmp-cap">{purpose}</div>
    </div>
  );
}

/* inert ctx so demo components render without touching app state */
const wfDemoCtx = {
  cart: {}, isFav: () => false, toggleFav: () => {}, addToCart: () => {},
  setQty: () => {}, navigate: () => {}, favList: () => [],
};

function WFComponentsCanvas() {
  const C = wfDemoCtx;
  const card = (w) => ({ width: w, paddingLeft: 0 });
  return (
    <DesignCanvas style={{ height: '100%', width: '100%' }}>

      {/* ---------------- Карточки товара ---------------- */}
      <DCSection id="cards" title="Карточки товара" subtitle="Каталог · 3 подачи Smart Cena">
        <DCArtboard id="card-chip" label="Карточка · бейдж" width={252} height={420} style={{ background: '#161618', outline: '1px solid rgba(255,255,255,.13)' }}>
          <WFCmpFrame purpose="Каталог. Намёк на опт чипом — не раздувает карточку.">
            <WFProductCard p={WF_PROD_MAP['p7']} ctx={C} smartMode="chip" />
          </WFCmpFrame>
        </DCArtboard>
        <DCArtboard id="card-list" label="Карточка · мини-список" width={252} height={470} style={{ background: '#161618', outline: '1px solid rgba(255,255,255,.13)' }}>
          <WFCmpFrame purpose="Основной вид. 3 ступени Smart Cena прямо в карточке.">
            <WFProductCard p={WF_PROD_MAP['p1']} ctx={C} smartMode="list" />
          </WFCmpFrame>
        </DCArtboard>
        <DCArtboard id="card-plain" label="Карточка · без опта" width={252} height={420} style={{ background: '#161618', outline: '1px solid rgba(255,255,255,.13)' }}>
          <WFCmpFrame purpose="Товар без оптовой цены — базовая карточка.">
            <WFProductCard p={WF_PROD_MAP['p2']} ctx={C} smartMode="none" />
          </WFCmpFrame>
        </DCArtboard>
        <DCArtboard id="card-full" label="Карточка · полная (референс)" width={356} height={620} style={{ background: '#161618', outline: '1px solid rgba(255,255,255,.13)' }}>
          <WFCmpFrame purpose="Промо-блок. Скидка, цена и все ступени + CTA «Выбрать».">
            <WFSmartCard p={WF_PROD_MAP['p1']} ctx={C} />
          </WFCmpFrame>
        </DCArtboard>
      </DCSection>

      {/* ---------------- Цена · Smart Cena ---------------- */}
      <DCSection id="price" title="Цена · Smart Cena" subtitle="Ступенчатая выгода">
        <DCArtboard id="price-block" label="Цена со скидкой" width={300} height={200} style={{ background: '#161618', outline: '1px solid rgba(255,255,255,.13)' }}>
          <WFCmpFrame purpose="Текущая цена и зачёркнутая старая.">
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <span className="wf-price" style={{ fontSize: 28 }}>690 zł<s style={{ fontSize: 16 }}>890 zł</s></span>
            </div>
          </WFCmpFrame>
        </DCArtboard>
        <DCArtboard id="price-tiers" label="Таблица Smart Cena" width={360} height={360} style={{ background: '#161618', outline: '1px solid rgba(255,255,255,.13)' }}>
          <WFCmpFrame purpose="Полная таблица на экране товара. Активная ступень подсвечена по количеству в корзине.">
            <div className="wf-block wf-smart-full" style={{ marginTop: 0 }}>
              <h4><WFIcon name="tag" size={18} style={{ color: 'var(--accent)' }} />Smart Cena<span className="wf-smart-sub">больше — выгоднее</span></h4>
              <div className="wf-tier-grid">
                {WF_PROD_MAP['p1'].smart.map(([q, pr], i) => (
                  <div className={'wf-tier' + (i === 2 ? ' on' : '')} key={q}><span>от {q} шт</span><b>{wfFmt(pr)}</b></div>
                ))}
              </div>
            </div>
          </WFCmpFrame>
        </DCArtboard>
        <DCArtboard id="price-chip" label="Чип Smart Cena" width={252} height={180} style={{ background: '#161618', outline: '1px solid rgba(255,255,255,.13)' }}>
          <WFCmpFrame purpose="Компактный намёк для плотных списков.">
            <div className="wf-smart-chip" style={{ width: 'auto', display: 'inline-flex' }}><WFIcon name="tag" size={12} />Smart Cena · до 490 zł</div>
          </WFCmpFrame>
        </DCArtboard>
      </DCSection>

      {/* ---------------- Кнопки ---------------- */}
      <DCSection id="buttons" title="Кнопки" subtitle="Действия и счётчики">
        <DCArtboard id="btn-main" label="Основные" width={300} height={230} style={{ background: '#161618', outline: '1px solid rgba(255,255,255,.13)' }}>
          <WFCmpFrame purpose="Главное действие и вторичное (ghost).">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button className="wf-btn block">Добавить в корзину</button>
              <button className="wf-btn ghost block">Сбросить</button>
            </div>
          </WFCmpFrame>
        </DCArtboard>
        <DCArtboard id="btn-counters" label="Счётчики и иконки" width={300} height={200} style={{ background: '#161618', outline: '1px solid rgba(255,255,255,.13)' }}>
          <WFCmpFrame purpose="Добавление, степпер количества, круглые кнопки.">
            <div className="wf-cmp-row" style={{ gap: 14, justifyContent: 'center' }}>
              <button className="wf-add"><WFIcon name="plus" size={18} /></button>
              <div className="wf-stepper"><button><WFIcon name="minus" size={16} /></button><span>2</span><button><WFIcon name="plus" size={16} /></button></div>
              <button className="wf-circbtn"><WFIcon name="heart" size={18} /></button>
              <button className="wf-circbtn"><WFIcon name="share" size={18} /></button>
            </div>
          </WFCmpFrame>
        </DCArtboard>
      </DCSection>

      {/* ---------------- Бейджи и чипы ---------------- */}
      <DCSection id="badges" title="Бейджи и чипы" subtitle="Метки и фильтры">
        <DCArtboard id="badge-tags" label="Теги товара" width={300} height={180} style={{ background: '#161618', outline: '1px solid rgba(255,255,255,.13)' }}>
          <WFCmpFrame purpose="Статусы и скидка на карточке.">
            <div className="wf-cmp-row" style={{ flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
              <span className="wf-tag" style={{ position: 'static' }}>Хит</span>
              <span className="wf-tag alt" style={{ position: 'static' }}>Новинка</span>
              <span className="wf-sc-disc" style={{ position: 'static' }}>−44%</span>
            </div>
          </WFCmpFrame>
        </DCArtboard>
        <DCArtboard id="badge-chips" label="Чипы-фильтры" width={300} height={180} style={{ background: '#161618', outline: '1px solid rgba(255,255,255,.13)' }}>
          <WFCmpFrame purpose="Категории и быстрые фильтры. Активный — заполненный.">
            <div className="wf-chips" style={{ flexWrap: 'wrap' }}>
              <button className="wf-pill on">Одноразовые</button>
              <button className="wf-pill">POD-системы</button>
              <button className="wf-pill">Жидкости</button>
            </div>
          </WFCmpFrame>
        </DCArtboard>
      </DCSection>

      {/* ---------------- Поля и поиск ---------------- */}
      <DCSection id="inputs" title="Поля и поиск" subtitle="Ввод данных">
        <DCArtboard id="input-search" label="Поиск" width={300} height={180} style={{ background: '#161618', outline: '1px solid rgba(255,255,255,.13)' }}>
          <WFCmpFrame purpose="Строка поиска по каталогу.">
            <WFSearchStub ctx={C} />
          </WFCmpFrame>
        </DCArtboard>
        <DCArtboard id="input-field" label="Текстовое поле" width={300} height={180} style={{ background: '#161618', outline: '1px solid rgba(255,255,255,.13)' }}>
          <WFCmpFrame purpose="Поле формы — адрес, комментарий и т.п.">
            <input className="wf-field" placeholder="Улица, дом" style={{ marginBottom: 0 }} />
          </WFCmpFrame>
        </DCArtboard>
      </DCSection>

    </DesignCanvas>
  );
}

Object.assign(window, { WFSmartCard, WFCmpFrame, WFComponentsCanvas });
