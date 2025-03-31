export type Card = {
  expression: string
  'expression-audio': string
  meaning: string
  sentence: string
  'sentence-audio': string
  'sentence-translation': string
  image: string
  url: string
  notes: string
  'cloze-prefix': string
  'cloze-body': string
  'cloze-suffix': string
}

export const card: Card = {
  expression: 'dejar',
  'expression-audio': '[sound:yomitan_audio_2025-02-26-09-00-30-496.wav]',
  meaning: `
  <div style="text-align: left;" class="yomitan-glossary"><ol><li data-dictionary="kty-es-en"><i>(v, kty-es-en)</i> <span><div><div data-sc-content="preamble"><details data-sc-content="details-entry-Grammar"><summary data-sc-content="summary-entry">Grammar</summary><div data-sc-content="Grammar-content">dejar (first-person singular present dejo, first-person singular preterite dejé, past participle dejado)</div></details><details data-sc-content="details-entry-Etymology"><summary data-sc-content="summary-entry">Etymology</summary><div data-sc-content="Etymology-content">Inherited from Old Spanish dexar, from Early Old Spanish lexar, from Latin laxāre, whence also laxar (a borrowed doublet). Also compare Portuguese and Galician deixar, Asturian dexar, Aragonese deixar, Catalan deixar, Occitan daissar, laissar, Sicilian dassari and both French laisser and délaisser.<br>Early Old Spanish generally has l-, forms appearing with d- towards 1200. The change of the initial l- to d- in many (especially Iberian) Romance languages has been explained in various ways: most likely, it is due to the influence of the preposition de, often used in constructions with this verb, or from an influence of, or contraction of, Late Latin dēlaxāre (also attested in Old Spanish as delexar), due to rapid pronunciation (as is common in quasi-auxiliary verbs). Less likely explanations include influence from the verb dar (“to give”), or derivation from Latin dēsinere, the latter proving difficult on phonetic grounds. Compare English lease (sense 5), lax, and laxative.</div></details></div></div><ol data-sc-content="glosses"><li><div><div data-sc-content="tags"><span data-sc-content="tag" data-sc-category="partOfSpeech" title="transitive verb">vt</span></div>to leave (to place)<details data-sc-content="details-entry-examples"><summary data-sc-content="summary-entry">1 example</summary><div data-sc-content="extra-info"><div data-sc-content="example-sentence"><div data-sc-content="example-sentence-a">Dejé la cerveza arriba.</div><div data-sc-content="example-sentence-b">I left the beer upstairs.</div></div></div></details></div></li><li><div><div data-sc-content="tags"><span data-sc-content="tag" data-sc-category="partOfSpeech" title="transitive verb">vt</span></div>to leave, to keep (to allow to continue)<details data-sc-content="details-entry-examples"><summary data-sc-content="summary-entry">2 examples</summary><div data-sc-content="extra-info"><div data-sc-content="example-sentence"><div data-sc-content="example-sentence-a">Me gusta dejar la luz encendida.</div><div data-sc-content="example-sentence-b">I like to keep/leave the light on.</div></div></div><div data-sc-content="extra-info"><div data-sc-content="example-sentence"><div data-sc-content="example-sentence-a">Supongo que podríamos dejar el restaurante abierto un poco más.</div><div data-sc-content="example-sentence-b">I suppose we could keep the restaurant open a little bit longer.</div></div></div></details></div></li><li><div><div data-sc-content="tags"><span data-sc-content="tag" data-sc-category="partOfSpeech" title="transitive verb">vt</span></div>to leave (to cause, result in)<details data-sc-content="details-entry-examples"><summary data-sc-content="summary-entry">1 example</summary><div data-sc-content="extra-info"><div data-sc-content="example-sentence"><div data-sc-content="example-sentence-a">Su respuesta nos dejó convencidos.</div><div data-sc-content="example-sentence-b">His answer left us convinced.</div></div></div></details></div></li><li><div><div data-sc-content="tags"><span data-sc-content="tag" data-sc-category="partOfSpeech" title="transitive verb">vt</span></div>to let, allow<details data-sc-content="details-entry-examples"><summary data-sc-content="summary-entry">2 examples</summary><div data-sc-content="extra-info"><div data-sc-content="example-sentence"><div data-sc-content="example-sentence-a">Deja que se explique.</div><div data-sc-content="example-sentence-b">Let her explain herself.</div></div></div><div data-sc-content="extra-info"><div data-sc-content="example-sentence"><div data-sc-content="example-sentence-a">Después de asear el área afectada, déjela secar.</div><div data-sc-content="example-sentence-b">After you clean the affected area, allow it to dry.</div></div></div></details></div></li><li><div><div data-sc-content="tags"><span data-sc-content="tag" data-sc-category="partOfSpeech" title="transitive verb">vt</span></div>to let go, put down (to release from one's grasp)</div></li><li><div><div data-sc-content="tags"><span data-sc-content="tag" data-sc-category="partOfSpeech" title="transitive verb">vt</span></div>to drop off<details data-sc-content="details-entry-examples"><summary data-sc-content="summary-entry">1 example</summary><div data-sc-content="extra-info"><div data-sc-content="example-sentence"><div data-sc-content="example-sentence-a">Ayer dejé un paquete muy importante.</div><div data-sc-content="example-sentence-b">Yesterday I dropped off a very important package.</div></div></div></details></div></li><li><div><div data-sc-content="tags"><span data-sc-content="tag" data-sc-category="partOfSpeech" title="transitive verb">vt</span></div>to leave, to abandon, to dump<details data-sc-content="details-entry-examples"><summary data-sc-content="summary-entry">2 examples</summary><div data-sc-content="extra-info"><div data-sc-content="example-sentence"><div data-sc-content="example-sentence-a">Su madre la dejó cuando tenía tres años.</div><div data-sc-content="example-sentence-b">Her mother left her when she was three.</div></div></div><div data-sc-content="extra-info"><div data-sc-content="example-sentence"><div data-sc-content="example-sentence-a">La invitó a una cita muy agradable, y de repente de la nada, él la dejó.</div><div data-sc-content="example-sentence-b">He took her on a really nice date, and then suddenly out of nowhere, he dumped her.</div></div></div></details></div></li><li><div><div data-sc-content="tags"><span data-sc-content="tag" data-sc-category="partOfSpeech" title="transitive verb">vt</span></div>to give up, to lay off, to kick (colloquial)<details data-sc-content="details-entry-examples"><summary data-sc-content="summary-entry">3 examples</summary><div data-sc-content="extra-info"><div data-sc-content="example-sentence"><div data-sc-content="example-sentence-a">Van a dejar la bebida.</div><div data-sc-content="example-sentence-b">They're going to lay off drinking.</div></div></div><div data-sc-content="extra-info"><div data-sc-content="example-sentence"><div data-sc-content="example-sentence-a">Estoy pensando en dejar el chocolate para la Cuaresma.</div><div data-sc-content="example-sentence-b">I am thinking of giving up chocolate for Lent.</div></div></div><div data-sc-content="extra-info"><div data-sc-content="example-sentence"><div data-sc-content="example-sentence-a">Espero dejar ese hábito terrible para siempre.</div><div data-sc-content="example-sentence-b">I hope to kick that terrible habit for good.</div></div></div></details></div></li><li><div><div data-sc-content="tags"><span data-sc-content="tag" data-sc-category="partOfSpeech" title="transitive verb">vt</span></div>to set, to put, to make (in certain phrases)<details data-sc-content="details-entry-examples"><summary data-sc-content="summary-entry">3 examples</summary><div data-sc-content="extra-info"><div data-sc-content="example-sentence"><div data-sc-content="example-sentence-a">Quería dejar las cosas claras.</div><div data-sc-content="example-sentence-b">I wanted to set the record straight.</div></div></div><div data-sc-content="extra-info"><div data-sc-content="example-sentence"><div data-sc-content="example-sentence-a">Usted tiene que dejar atrás el pasado.</div><div data-sc-content="example-sentence-b">You've got to put the past behind you.</div></div></div><div data-sc-content="extra-info"><div data-sc-content="example-sentence"><div data-sc-content="example-sentence-a">El político emergente estaba decidido a dejar su huella.</div><div data-sc-content="example-sentence-b">The emerging politician was determined to make his mark.</div></div></div></details></div></li><li><div><div data-sc-content="tags"><span data-sc-content="tag" data-sc-category="dialect" title="Spain">🇪🇸</span><span data-sc-content="tag" data-sc-category="" title="colloquial">col</span><span data-sc-content="tag" data-sc-category="partOfSpeech" title="transitive verb">vt</span></div>to cut out (stop)</div></li><li><div><div data-sc-content="tags"><span data-sc-content="tag" data-sc-category="partOfSpeech" title="intransitive verb">vi</span></div>to leave off</div></li><li><div><div data-sc-content="tags"><span data-sc-content="tag" data-sc-category="partOfSpeech" title="intransitive verb">vi</span></div>to cease, stop [with de (+ infinitive) ‘doing something’]<details data-sc-content="details-entry-examples"><summary data-sc-content="summary-entry">2 examples</summary><div data-sc-content="extra-info"><div data-sc-content="example-sentence"><div data-sc-content="example-sentence-a">Hace dos años dejaron de fumar.</div><div data-sc-content="example-sentence-b">Two years ago they stopped smoking.</div></div></div><div data-sc-content="extra-info"><div data-sc-content="example-sentence"><div data-sc-content="example-sentence-a">Mi pareja no deja de sorprenderme.</div><div data-sc-content="example-sentence-b">My partner never ceases to amaze me.</div></div></div></details></div></li><li><div><div data-sc-content="tags"><span data-sc-content="tag" data-sc-category="partOfSpeech" title="reflexive verb">vr</span></div>to be left [with a ‘to someone’]</div></li><li><div><div data-sc-content="tags"><span data-sc-content="tag" data-sc-category="partOfSpeech" title="reflexive verb">vr</span></div>to let (oneself), to let oneself go (to cease to care about one's appearance)</div></li></ol><div data-sc-content="backlink"><a href="https://en.wiktionary.org/wiki/dejar#Spanish"><span>Wiktionary</span><span style="display:none;"></span></a></div></span></li><style>.yomitan-glossary [data-dictionary="kty-es-en"] .tag[data-details="masculine"] .tag-label { background-color: rgb(77, 130, 232); }
.yomitan-glossary [data-dictionary="kty-es-en"] .tag[data-details="feminine"] .tag-label { background-color: rgb(202, 77, 147); }
.yomitan-glossary [data-dictionary="kty-es-en"] .tag[data-details="neuter"] .tag-label { background-color: rgb(64, 172, 101); }
.yomitan-glossary [data-dictionary="kty-es-en"] div[data-sc-content="tags"] span { font-size: 0.8em; font-weight: bold; padding: 0.2em 0.3em; word-break: keep-all; border-radius: 0.3em; vertical-align: text-bottom; background-color: rgb(86, 86, 86); color: white; cursor: help; margin-right: 0.25em; }
.yomitan-glossary [data-dictionary="kty-es-en"] div[data-sc-content="extra-info"] { margin-left: 0.5em; }
.yomitan-glossary [data-dictionary="kty-es-en"] div[data-sc-content="example-sentence"] { background-color: color-mix(in srgb, var(--text-color, var(--fg, #333)) 5%, transparent); border-color: var(--text-color, var(--fg, #333)); border-style: none none none solid; border-radius: 0.4rem; border-width: calc(3em / var(--font-size-no-units, 14)); margin-top: 0.5rem; margin-bottom: 0.5rem; padding: 0.1rem 0.5rem; }
.yomitan-glossary [data-dictionary="kty-es-en"] div[data-sc-content="example-sentence-a"] { font-size: 1.1em; font-style: italic; }
.yomitan-glossary [data-dictionary="kty-es-en"] div[data-sc-content="example-sentence-b"] { font-size: 0.8em; }
.yomitan-glossary [data-dictionary="kty-es-en"] details[data-sc-content^="details-entry"] { padding-left: 0px; }
.yomitan-glossary [data-dictionary="kty-es-en"] summary[data-sc-content="summary-entry"] { user-select: none; width: max-content; padding: 0.1em 0.2em; }
.yomitan-glossary [data-dictionary="kty-es-en"] ol[data-sc-content="glosses"] { list-style-type: upper-roman; }
.yomitan-glossary [data-dictionary="kty-es-en"] [data-sc-content="summary-entry"]::marker { color: var(--checkbox-disabled-color); }
.yomitan-glossary [data-dictionary="kty-es-en"] summary[data-sc-content="summary-entry"] { list-style-position: inside; color: var(--text-color-light4); }
.yomitan-glossary [data-dictionary="kty-es-en"] details[data-sc-content^="details-entry-Grammar"] summary[data-sc-content="summary-entry"], .yomitan-glossary [data-dictionary="kty-es-en"] details[data-sc-content^="details-entry-Etymology"] summary[data-sc-content="summary-entry"], .yomitan-glossary [data-dictionary="kty-es-en"] details[data-sc-content^="details-entry-Morphemes"] summary[data-sc-content="summary-entry"] { font-weight: bold; }
.yomitan-glossary [data-dictionary="kty-es-en"] details[data-sc-content^="details-entry"][open=""] summary[data-sc-content="summary-entry"] { color: var(--text-color); }
.yomitan-glossary [data-dictionary="kty-es-en"] details[data-sc-content^="details-entry"][open=""] summary[data-sc-content="summary-entry"]::marker { color: var(--text-color); }
.yomitan-glossary [data-dictionary="kty-es-en"] summary[data-sc-content="summary-entry"]:hover { border-radius: 0.4em; background-color: var(--notification-background-color-lighter); cursor: pointer; color: var(--text-color); }
.yomitan-glossary [data-dictionary="kty-es-en"] summary[data-sc-content="summary-entry"] ~ div { margin: 0.5em 0px; }
.yomitan-glossary [data-dictionary="kty-es-en"] div[data-sc-content="backlink"] { font-size: 0.7em; text-align: right; }</style><li data-dictionary="kty-es-ru"><i>(v, kty-es-ru)</i> <span><div><div data-sc-content="preamble"><details data-sc-content="details-entry-Etymology"><summary data-sc-content="summary-entry">Etymology</summary><div data-sc-content="Etymology-content">Происходит от ??</div></details></div></div><ol data-sc-content="glosses"><li><div>оставлять, бросать, покидать</div></li><li><div>класть, оставлять</div></li><li><div>оставлять, завещать</div></li><li><div>(+ de + инф.) переставать, прекращать, бросать<details data-sc-content="details-entry-examples"><summary data-sc-content="summary-entry">1 пример</summary><div data-sc-content="extra-info"><div data-sc-content="example-sentence"><div data-sc-content="example-sentence-a">Él dejó de fumar.</div><div data-sc-content="example-sentence-b">Он бросил курить.</div></div></div></details></div></li><li><div>поручать, оставлять на хранение, оставлять на попечение, доверять</div></li><li><div>давать взаймы, одалживать</div></li><li><div>давать возможность, не препятствовать, позволять, разрешать</div></li></ol><div data-sc-content="backlink"><a href="https://ru.wiktionary.org/wiki/dejar#Spanish"><span>Wiktionary</span><span style="display:none;"></span></a></div></span></li><style>.yomitan-glossary [data-dictionary="kty-es-ru"] div[data-sc-content="tags"] span { font-size: 0.8em; font-weight: bold; padding: 0.2em 0.3em; word-break: keep-all; border-radius: 0.3em; vertical-align: text-bottom; background-color: rgb(86, 86, 86); color: white; cursor: help; margin-right: 0.25em; }
.yomitan-glossary [data-dictionary="kty-es-ru"] div[data-sc-content="extra-info"] { margin-left: 0.5em; }
.yomitan-glossary [data-dictionary="kty-es-ru"] div[data-sc-content="example-sentence"] { background-color: color-mix(in srgb, var(--text-color, var(--fg, #333)) 5%, transparent); border-color: var(--text-color, var(--fg, #333)); border-style: none none none solid; border-radius: 0.4rem; border-width: calc(3em / var(--font-size-no-units, 14)); margin-top: 0.5rem; margin-bottom: 0.5rem; padding: 0.1rem 0.5rem; }
.yomitan-glossary [data-dictionary="kty-es-ru"] div[data-sc-content="example-sentence-a"] { font-size: 1.1em; font-style: italic; }
.yomitan-glossary [data-dictionary="kty-es-ru"] div[data-sc-content="example-sentence-b"] { font-size: 0.8em; }
.yomitan-glossary [data-dictionary="kty-es-ru"] details[data-sc-content^="details-entry"] { padding-left: 0px; }
.yomitan-glossary [data-dictionary="kty-es-ru"] summary[data-sc-content="summary-entry"] { user-select: none; width: max-content; padding: 0.1em 0.2em; }
.yomitan-glossary [data-dictionary="kty-es-ru"] ol[data-sc-content="glosses"] { list-style-type: upper-roman; }
.yomitan-glossary [data-dictionary="kty-es-ru"] [data-sc-content="summary-entry"]::marker { color: var(--checkbox-disabled-color); }
.yomitan-glossary [data-dictionary="kty-es-ru"] summary[data-sc-content="summary-entry"] { list-style-position: inside; color: var(--text-color-light4); }
.yomitan-glossary [data-dictionary="kty-es-ru"] details[data-sc-content^="details-entry-Grammar"] summary[data-sc-content="summary-entry"], .yomitan-glossary [data-dictionary="kty-es-ru"] details[data-sc-content^="details-entry-Etymology"] summary[data-sc-content="summary-entry"], .yomitan-glossary [data-dictionary="kty-es-ru"] details[data-sc-content^="details-entry-Morphemes"] summary[data-sc-content="summary-entry"] { font-weight: bold; }
.yomitan-glossary [data-dictionary="kty-es-ru"] details[data-sc-content^="details-entry"][open=""] summary[data-sc-content="summary-entry"] { color: var(--text-color); }
.yomitan-glossary [data-dictionary="kty-es-ru"] details[data-sc-content^="details-entry"][open=""] summary[data-sc-content="summary-entry"]::marker { color: var(--text-color); }
.yomitan-glossary [data-dictionary="kty-es-ru"] summary[data-sc-content="summary-entry"]:hover { border-radius: 0.4em; background-color: var(--notification-background-color-lighter); cursor: pointer; color: var(--text-color); }
.yomitan-glossary [data-dictionary="kty-es-ru"] summary[data-sc-content="summary-entry"] ~ div { margin: 0.5em 0px; }
.yomitan-glossary [data-dictionary="kty-es-ru"] div[data-sc-content="backlink"] { font-size: 0.7em; text-align: right; }</style></ol></div>
  `,
  sentence:
    'Esta práctica dejaba a las vacas bastante mal&nbsp;<br>nutridas y afortunadamente ya no se produce.',
  'sentence-audio': '[sound:¿Por_qué_la_ropa_mojada__381000_PJEKijnR.mp3]',
  'sentence-translation': 'The animal is isolated',
  image: '<img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.X2DjyJZMkkxSQiMHw9EgnAHaD6%26pid%3DApi&f=1&ipt=b3f14d0bdb739d3a0b2f0f293634724e01c81c5d48471ea07d91bb76fc3e3b03&ipo=images">',
  url: '<a href="https://www.youtube.com/watch?v=ycgdF-ugV_s">https://www.youtube.com/watch?v=ycgdF-ugV_s</a>',
  notes: 'Хуня какая-то это правда не совсем понятная',
  'cloze-prefix': 'Esta práctica ',
  'cloze-body': 'dejaba',
  'cloze-suffix': ' a las vacas bastante mal'
}