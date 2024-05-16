import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import classnames from 'classnames';
import { useTranslation } from 'next-i18next';
import { string } from 'prop-types';
import { useContext, useMemo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { formFieldDataType } from '../../../../../../types';
import { FormConfigContext } from '../../../context';
import { usePendingForValueFieldOptions } from '../../../hooks';
import flagImage from './high-res.png';

const PREFIX = 'InputPhone';
const classes = {
  root: `${PREFIX}-root`,
  fields: `${PREFIX}-fields`,
  'select-wrapper': `${PREFIX}-select-wrapper`,
  'input-wrapper': `${PREFIX}-input-wrapper`,
  input: `${PREFIX}-input`,
  mask: `${PREFIX}-mask`,
  flag: `${PREFIX}-flag`,
  ad: `${PREFIX}-ad`,
  ae: `${PREFIX}-ae`,
  af: `${PREFIX}-af`,
  ag: `${PREFIX}-ag`,
  ai: `${PREFIX}-ai`,
  al: `${PREFIX}-al`,
  am: `${PREFIX}-am`,
  an: `${PREFIX}-an`,
  ao: `${PREFIX}-ao`,
  aq: `${PREFIX}-aq`,
  ar: `${PREFIX}-ar`,
  as: `${PREFIX}-as`,
  at: `${PREFIX}-at`,
  au: `${PREFIX}-au`,
  aw: `${PREFIX}-aw`,
  ax: `${PREFIX}-ax`,
  az: `${PREFIX}-az`,
  ba: `${PREFIX}-ba`,
  bb: `${PREFIX}-bb`,
  bd: `${PREFIX}-bd`,
  be: `${PREFIX}-be`,
  bf: `${PREFIX}-bf`,
  bg: `${PREFIX}-bg`,
  bh: `${PREFIX}-bh`,
  bi: `${PREFIX}-bi`,
  bj: `${PREFIX}-bj`,
  bl: `${PREFIX}-bl`,
  bm: `${PREFIX}-bm`,
  bn: `${PREFIX}-bn`,
  bo: `${PREFIX}-bo`,
  br: `${PREFIX}-br`,
  bs: `${PREFIX}-bs`,
  bt: `${PREFIX}-bt`,
  bw: `${PREFIX}-bw`,
  by: `${PREFIX}-by`,
  bz: `${PREFIX}-bz`,
  ca: `${PREFIX}-ca`,
  cc: `${PREFIX}-cc`,
  cd: `${PREFIX}-cd`,
  cf: `${PREFIX}-cf`,
  cg: `${PREFIX}-cg`,
  ch: `${PREFIX}-ch`,
  ci: `${PREFIX}-ci`,
  ck: `${PREFIX}-ck`,
  cl: `${PREFIX}-cl`,
  cm: `${PREFIX}-cm`,
  cn: `${PREFIX}-cn`,
  co: `${PREFIX}-co`,
  cr: `${PREFIX}-cr`,
  cu: `${PREFIX}-cu`,
  cv: `${PREFIX}-cv`,
  cw: `${PREFIX}-cw`,
  cx: `${PREFIX}-cx`,
  cy: `${PREFIX}-cy`,
  cz: `${PREFIX}-cz`,
  de: `${PREFIX}-de`,
  dj: `${PREFIX}-dj`,
  dk: `${PREFIX}-dk`,
  dm: `${PREFIX}-dm`,
  do: `${PREFIX}-do`,
  dz: `${PREFIX}-dz`,
  ec: `${PREFIX}-ec`,
  ee: `${PREFIX}-ee`,
  eg: `${PREFIX}-eg`,
  eh: `${PREFIX}-eh`,
  er: `${PREFIX}-er`,
  es: `${PREFIX}-es`,
  et: `${PREFIX}-et`,
  eu: `${PREFIX}-eu`,
  fi: `${PREFIX}-fi`,
  fj: `${PREFIX}-fj`,
  fk: `${PREFIX}-fk`,
  fm: `${PREFIX}-fm`,
  fo: `${PREFIX}-fo`,
  fr: `${PREFIX}-fr`,
  ga: `${PREFIX}-ga`,
  gb: `${PREFIX}-gb`,
  gd: `${PREFIX}-gd`,
  ge: `${PREFIX}-ge`,
  gg: `${PREFIX}-gg`,
  gh: `${PREFIX}-gh`,
  gi: `${PREFIX}-gi`,
  gl: `${PREFIX}-gl`,
  gm: `${PREFIX}-gm`,
  gn: `${PREFIX}-gn`,
  gq: `${PREFIX}-gq`,
  gr: `${PREFIX}-gr`,
  gs: `${PREFIX}-gs`,
  gt: `${PREFIX}-gt`,
  gu: `${PREFIX}-gu`,
  gw: `${PREFIX}-gw`,
  gy: `${PREFIX}-gy`,
  hk: `${PREFIX}-hk`,
  hn: `${PREFIX}-hn`,
  hr: `${PREFIX}-hr`,
  ht: `${PREFIX}-ht`,
  hu: `${PREFIX}-hu`,
  ic: `${PREFIX}-ic`,
  id: `${PREFIX}-id`,
  ie: `${PREFIX}-ie`,
  il: `${PREFIX}-il`,
  im: `${PREFIX}-im`,
  in: `${PREFIX}-in`,
  iq: `${PREFIX}-iq`,
  ir: `${PREFIX}-ir`,
  is: `${PREFIX}-is`,
  it: `${PREFIX}-it`,
  je: `${PREFIX}-je`,
  jm: `${PREFIX}-jm`,
  jo: `${PREFIX}-jo`,
  jp: `${PREFIX}-jp`,
  ke: `${PREFIX}-ke`,
  kg: `${PREFIX}-kg`,
  kh: `${PREFIX}-kh`,
  ki: `${PREFIX}-ki`,
  km: `${PREFIX}-km`,
  kn: `${PREFIX}-kn`,
  kp: `${PREFIX}-kp`,
  kr: `${PREFIX}-kr`,
  kw: `${PREFIX}-kw`,
  ky: `${PREFIX}-ky`,
  kz: `${PREFIX}-kz`,
  la: `${PREFIX}-la`,
  lb: `${PREFIX}-lb`,
  lc: `${PREFIX}-lc`,
  li: `${PREFIX}-li`,
  lk: `${PREFIX}-lk`,
  lr: `${PREFIX}-lr`,
  ls: `${PREFIX}-ls`,
  lt: `${PREFIX}-lt`,
  lu: `${PREFIX}-lu`,
  lv: `${PREFIX}-lv`,
  ly: `${PREFIX}-ly`,
  ma: `${PREFIX}-ma`,
  mc: `${PREFIX}-mc`,
  md: `${PREFIX}-md`,
  me: `${PREFIX}-me`,
  mf: `${PREFIX}-mf`,
  mg: `${PREFIX}-mg`,
  mh: `${PREFIX}-mh`,
  mk: `${PREFIX}-mk`,
  ml: `${PREFIX}-ml`,
  mm: `${PREFIX}-mm`,
  mn: `${PREFIX}-mn`,
  mo: `${PREFIX}-mo`,
  mp: `${PREFIX}-mp`,
  mq: `${PREFIX}-mq`,
  mr: `${PREFIX}-mr`,
  ms: `${PREFIX}-ms`,
  mt: `${PREFIX}-mt`,
  mu: `${PREFIX}-mu`,
  mv: `${PREFIX}-mv`,
  mw: `${PREFIX}-mw`,
  mx: `${PREFIX}-mx`,
  my: `${PREFIX}-my`,
  mz: `${PREFIX}-mz`,
  na: `${PREFIX}-na`,
  nc: `${PREFIX}-nc`,
  ne: `${PREFIX}-ne`,
  nf: `${PREFIX}-nf`,
  ng: `${PREFIX}-ng`,
  ni: `${PREFIX}-ni`,
  nl: `${PREFIX}-nl`,
  no: `${PREFIX}-no`,
  np: `${PREFIX}-np`,
  nr: `${PREFIX}-nr`,
  nu: `${PREFIX}-nu`,
  nz: `${PREFIX}-nz`,
  om: `${PREFIX}-om`,
  pa: `${PREFIX}-pa`,
  pe: `${PREFIX}-pe`,
  pf: `${PREFIX}-pf`,
  pg: `${PREFIX}-pg`,
  ph: `${PREFIX}-ph`,
  pk: `${PREFIX}-pk`,
  pl: `${PREFIX}-pl`,
  pn: `${PREFIX}-pn`,
  pr: `${PREFIX}-pr`,
  ps: `${PREFIX}-ps`,
  pt: `${PREFIX}-pt`,
  pw: `${PREFIX}-pw`,
  py: `${PREFIX}-py`,
  qa: `${PREFIX}-qa`,
  ro: `${PREFIX}-ro`,
  rs: `${PREFIX}-rs`,
  ru: `${PREFIX}-ru`,
  rw: `${PREFIX}-rw`,
  sa: `${PREFIX}-sa`,
  sb: `${PREFIX}-sb`,
  sc: `${PREFIX}-sc`,
  sd: `${PREFIX}-sd`,
  se: `${PREFIX}-se`,
  sg: `${PREFIX}-sg`,
  sh: `${PREFIX}-sh`,
  si: `${PREFIX}-si`,
  sk: `${PREFIX}-sk`,
  sl: `${PREFIX}-sl`,
  sm: `${PREFIX}-sm`,
  sn: `${PREFIX}-sn`,
  so: `${PREFIX}-so`,
  sr: `${PREFIX}-sr`,
  ss: `${PREFIX}-ss`,
  st: `${PREFIX}-st`,
  sv: `${PREFIX}-sv`,
  sy: `${PREFIX}-sy`,
  sz: `${PREFIX}-sz`,
  tc: `${PREFIX}-tc`,
  td: `${PREFIX}-td`,
  tf: `${PREFIX}-tf`,
  tg: `${PREFIX}-tg`,
  th: `${PREFIX}-th`,
  tj: `${PREFIX}-tj`,
  tk: `${PREFIX}-tk`,
  tl: `${PREFIX}-tl`,
  tm: `${PREFIX}-tm`,
  tn: `${PREFIX}-tn`,
  to: `${PREFIX}-to`,
  tr: `${PREFIX}-tr`,
  tt: `${PREFIX}-tt`,
  tv: `${PREFIX}-tv`,
  tw: `${PREFIX}-tw`,
  tz: `${PREFIX}-tz`,
  ua: `${PREFIX}-ua`,
  ug: `${PREFIX}-ug`,
  us: `${PREFIX}-us`,
  uy: `${PREFIX}-uy`,
  uz: `${PREFIX}-uz`,
  va: `${PREFIX}-va`,
  vc: `${PREFIX}-vc`,
  ve: `${PREFIX}-ve`,
  vg: `${PREFIX}-vg`,
  vi: `${PREFIX}-vi`,
  vn: `${PREFIX}-vn`,
  vu: `${PREFIX}-vu`,
  wf: `${PREFIX}-wf`,
  ws: `${PREFIX}-ws`,
  ye: `${PREFIX}-ye`,
  za: `${PREFIX}-za`,
  zm: `${PREFIX}-zm`,
  zw: `${PREFIX}-zw`
};

const StyledInputPhoneWrapper = styled('div')(() => {
  return {
    [`&.${classes.root}`]: { position: 'relative', zIndex: 1 },
    [`& .${classes.fields}`]: { display: 'flex' },
    [`& .${classes['select-wrapper']}`]: {
      flex: '0 1 auto',
      maxWidth: '75px',
      position: 'relative',
      '& $select': { opacity: 0 }
    },
    [`& .${classes['input-wrapper']}`]: { flex: '1 0 auto', position: 'relative' },
    [`& .${classes.input}`]: {
      position: 'relative',
      height: '100%',
      width: '100%',
      zIndex: 1,
      fontSize: 'inherit',
      letterSpacing: 'inherit'
    },
    [`& .${classes.mask}`]: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      bottom: '0',
      opacity: 0.5,
      paddingBottom: '1px',
      fontSize: 'inherit',
      letterSpacing: 'inherit',
      overflow: 'hidden',
      zIndex: -1
    },
    [`& .${classes.flag}`]: {
      backgroundPosition: '-384px 0',
      position: 'absolute',
      top: '40%',
      left: '0',
      transform: 'translate(0, -50%)',
      width: '25px',
      height: '20px',
      backgroundImage: `url(${flagImage.src})`,
      backgroundRepeat: 'no-repeat',
      zIndex: -1
    },
    [`& .${classes.ad}`]: { backgroundPosition: '-48px -24px' },
    [`& .${classes.ae}`]: { backgroundPosition: '-72px -24px' },
    [`& .${classes.af}`]: { backgroundPosition: '-96px -24px' },
    [`& .${classes.ag}`]: { backgroundPosition: '-120px -24px' },
    [`& .${classes.ai}`]: { backgroundPosition: '-144px -24px' },
    [`& .${classes.al}`]: { backgroundPosition: '-168px -24px' },
    [`& .${classes.am}`]: { backgroundPosition: '-192px -24px' },
    [`& .${classes.an}`]: { backgroundPosition: '-216px -24px' },
    [`& .${classes.ao}`]: { backgroundPosition: '-240px -24px' },
    [`& .${classes.aq}`]: { backgroundPosition: '-264px -24px' },
    [`& .${classes.ar}`]: { backgroundPosition: '-288px -24px' },
    [`& .${classes.as}`]: { backgroundPosition: '-312px -24px' },
    [`& .${classes.at}`]: { backgroundPosition: '-336px -24px' },
    [`& .${classes.au}`]: { backgroundPosition: '-360px -24px' },
    [`& .${classes.aw}`]: { backgroundPosition: '-384px -24px' },
    [`& .${classes.ax}`]: { backgroundPosition: '-0px -48px' },
    [`& .${classes.az}`]: { backgroundPosition: '-24px -48px' },
    [`& .${classes.ba}`]: { backgroundPosition: '-48px -48px' },
    [`& .${classes.bb}`]: { backgroundPosition: '-72px -48px' },
    [`& .${classes.bd}`]: { backgroundPosition: '-96px -48px' },
    [`& .${classes.be}`]: { backgroundPosition: '-120px -48px' },
    [`& .${classes.bf}`]: { backgroundPosition: '-144px -48px' },
    [`& .${classes.bg}`]: { backgroundPosition: '-168px -48px' },
    [`& .${classes.bh}`]: { backgroundPosition: '-192px -48px' },
    [`& .${classes.bi}`]: { backgroundPosition: '-216px -48px' },
    [`& .${classes.bj}`]: { backgroundPosition: '-240px -48px' },
    [`& .${classes.bl}`]: { backgroundPosition: '-264px -48px' },
    [`& .${classes.bm}`]: { backgroundPosition: '-288px -48px' },
    [`& .${classes.bn}`]: { backgroundPosition: '-312px -48px' },
    [`& .${classes.bo}`]: { backgroundPosition: '-336px -48px' },
    [`& .${classes.br}`]: { backgroundPosition: '-360px -48px' },
    [`& .${classes.bs}`]: { backgroundPosition: '-384px -48px' },
    [`& .${classes.bt}`]: { backgroundPosition: '-0px -72px' },
    [`& .${classes.bw}`]: { backgroundPosition: '-24px -72px' },
    [`& .${classes.by}`]: { backgroundPosition: '-48px -72px' },
    [`& .${classes.bz}`]: { backgroundPosition: '-72px -72px' },
    [`& .${classes.ca}`]: { backgroundPosition: '-96px -72px' },
    [`& .${classes.cc}`]: { backgroundPosition: '-120px -72px' },
    [`& .${classes.cd}`]: { backgroundPosition: '-144px -72px' },
    [`& .${classes.cf}`]: { backgroundPosition: '-168px -72px' },
    [`& .${classes.cg}`]: { backgroundPosition: '-192px -72px' },
    [`& .${classes.ch}`]: { backgroundPosition: '-216px -72px' },
    [`& .${classes.ci}`]: { backgroundPosition: '-240px -72px' },
    [`& .${classes.ck}`]: { backgroundPosition: '-264px -72px' },
    [`& .${classes.cl}`]: { backgroundPosition: '-288px -72px' },
    [`& .${classes.cm}`]: { backgroundPosition: '-312px -72px' },
    [`& .${classes.cn}`]: { backgroundPosition: '-336px -72px' },
    [`& .${classes.co}`]: { backgroundPosition: '-360px -72px' },
    [`& .${classes.cr}`]: { backgroundPosition: '-384px -72px' },
    [`& .${classes.cu}`]: { backgroundPosition: '-0px -96px' },
    [`& .${classes.cv}`]: { backgroundPosition: '-24px -96px' },
    [`& .${classes.cw}`]: { backgroundPosition: '-48px -96px' },
    [`& .${classes.cx}`]: { backgroundPosition: '-72px -96px' },
    [`& .${classes.cy}`]: { backgroundPosition: '-96px -96px' },
    [`& .${classes.cz}`]: { backgroundPosition: '-120px -96px' },
    [`& .${classes.de}`]: { backgroundPosition: '-144px -96px' },
    [`& .${classes.dj}`]: { backgroundPosition: '-168px -96px' },
    [`& .${classes.dk}`]: { backgroundPosition: '-192px -96px' },
    [`& .${classes.dm}`]: { backgroundPosition: '-216px -96px' },
    [`& .${classes.do}`]: { backgroundPosition: '-240px -96px' },
    [`& .${classes.dz}`]: { backgroundPosition: '-264px -96px' },
    [`& .${classes.ec}`]: { backgroundPosition: '-288px -96px' },
    [`& .${classes.ee}`]: { backgroundPosition: '-312px -96px' },
    [`& .${classes.eg}`]: { backgroundPosition: '-336px -96px' },
    [`& .${classes.eh}`]: { backgroundPosition: '-360px -96px' },
    [`& .${classes.er}`]: { backgroundPosition: '-384px -96px' },
    [`& .${classes.es}`]: { backgroundPosition: '-0px -120px' },
    [`& .${classes.et}`]: { backgroundPosition: '-24px -120px' },
    [`& .${classes.eu}`]: { backgroundPosition: '-48px -120px' },
    [`& .${classes.fi}`]: { backgroundPosition: '-72px -120px' },
    [`& .${classes.fj}`]: { backgroundPosition: '-96px -120px' },
    [`& .${classes.fk}`]: { backgroundPosition: '-120px -120px' },
    [`& .${classes.fm}`]: { backgroundPosition: '-144px -120px' },
    [`& .${classes.fo}`]: { backgroundPosition: '-168px -120px' },
    [`& .${classes.fr}`]: { backgroundPosition: '-192px -120px' },
    [`& .${classes.ga}`]: { backgroundPosition: '-216px -120px' },
    [`& .${classes.gb}`]: { backgroundPosition: '-240px -120px' },
    [`& .${classes.gd}`]: { backgroundPosition: '-264px -120px' },
    [`& .${classes.ge}`]: { backgroundPosition: '-288px -120px' },
    [`& .${classes.gg}`]: { backgroundPosition: '-312px -120px' },
    [`& .${classes.gh}`]: { backgroundPosition: '-336px -120px' },
    [`& .${classes.gi}`]: { backgroundPosition: '-360px -120px' },
    [`& .${classes.gl}`]: { backgroundPosition: '-384px -120px' },
    [`& .${classes.gm}`]: { backgroundPosition: '-0px -144px' },
    [`& .${classes.gn}`]: { backgroundPosition: '-24px -144px' },
    [`& .${classes.gq}`]: { backgroundPosition: '-48px -144px' },
    [`& .${classes.gr}`]: { backgroundPosition: '-72px -144px' },
    [`& .${classes.gs}`]: { backgroundPosition: '-96px -144px' },
    [`& .${classes.gt}`]: { backgroundPosition: '-120px -144px' },
    [`& .${classes.gu}`]: { backgroundPosition: '-144px -144px' },
    [`& .${classes.gw}`]: { backgroundPosition: '-168px -144px' },
    [`& .${classes.gy}`]: { backgroundPosition: '-192px -144px' },
    [`& .${classes.hk}`]: { backgroundPosition: '-216px -144px' },
    [`& .${classes.hn}`]: { backgroundPosition: '-240px -144px' },
    [`& .${classes.hr}`]: { backgroundPosition: '-264px -144px' },
    [`& .${classes.ht}`]: { backgroundPosition: '-288px -144px' },
    [`& .${classes.hu}`]: { backgroundPosition: '-312px -144px' },
    [`& .${classes.ic}`]: { backgroundPosition: '-336px -144px' },
    [`& .${classes.id}`]: { backgroundPosition: '-360px -144px' },
    [`& .${classes.ie}`]: { backgroundPosition: '-384px -144px' },
    [`& .${classes.il}`]: { backgroundPosition: '-0px -168px' },
    [`& .${classes.im}`]: { backgroundPosition: '-24px -168px' },
    [`& .${classes.in}`]: { backgroundPosition: '-48px -168px' },
    [`& .${classes.iq}`]: { backgroundPosition: '-72px -168px' },
    [`& .${classes.ir}`]: { backgroundPosition: '-96px -168px' },
    [`& .${classes.is}`]: { backgroundPosition: '-120px -168px' },
    [`& .${classes.it}`]: { backgroundPosition: '-144px -168px' },
    [`& .${classes.je}`]: { backgroundPosition: '-168px -168px' },
    [`& .${classes.jm}`]: { backgroundPosition: '-192px -168px' },
    [`& .${classes.jo}`]: { backgroundPosition: '-216px -168px' },
    [`& .${classes.jp}`]: { backgroundPosition: '-240px -168px' },
    [`& .${classes.ke}`]: { backgroundPosition: '-264px -168px' },
    [`& .${classes.kg}`]: { backgroundPosition: '-288px -168px' },
    [`& .${classes.kh}`]: { backgroundPosition: '-312px -168px' },
    [`& .${classes.ki}`]: { backgroundPosition: '-336px -168px' },
    [`& .${classes.km}`]: { backgroundPosition: '-360px -168px' },
    [`& .${classes.kn}`]: { backgroundPosition: '-384px -168px' },
    [`& .${classes.kp}`]: { backgroundPosition: '-0px -192px' },
    [`& .${classes.kr}`]: { backgroundPosition: '-24px -192px' },
    [`& .${classes.kw}`]: { backgroundPosition: '-48px -192px' },
    [`& .${classes.ky}`]: { backgroundPosition: '-72px -192px' },
    [`& .${classes.kz}`]: { backgroundPosition: '-96px -192px' },
    [`& .${classes.la}`]: { backgroundPosition: '-120px -192px' },
    [`& .${classes.lb}`]: { backgroundPosition: '-144px -192px' },
    [`& .${classes.lc}`]: { backgroundPosition: '-168px -192px' },
    [`& .${classes.li}`]: { backgroundPosition: '-192px -192px' },
    [`& .${classes.lk}`]: { backgroundPosition: '-216px -192px' },
    [`& .${classes.lr}`]: { backgroundPosition: '-240px -192px' },
    [`& .${classes.ls}`]: { backgroundPosition: '-264px -192px' },
    [`& .${classes.lt}`]: { backgroundPosition: '-288px -192px' },
    [`& .${classes.lu}`]: { backgroundPosition: '-312px -192px' },
    [`& .${classes.lv}`]: { backgroundPosition: '-336px -192px' },
    [`& .${classes.ly}`]: { backgroundPosition: '-360px -192px' },
    [`& .${classes.ma}`]: { backgroundPosition: '-384px -192px' },
    [`& .${classes.mc}`]: { backgroundPosition: '-0px -216px' },
    [`& .${classes.md}`]: { backgroundPosition: '-24px -216px' },
    [`& .${classes.me}`]: { backgroundPosition: '-48px -216px' },
    [`& .${classes.mf}`]: { backgroundPosition: '-72px -216px' },
    [`& .${classes.mg}`]: { backgroundPosition: '-96px -216px' },
    [`& .${classes.mh}`]: { backgroundPosition: '-120px -216px' },
    [`& .${classes.mk}`]: { backgroundPosition: '-144px -216px' },
    [`& .${classes.ml}`]: { backgroundPosition: '-168px -216px' },
    [`& .${classes.mm}`]: { backgroundPosition: '-192px -216px' },
    [`& .${classes.mn}`]: { backgroundPosition: '-216px -216px' },
    [`& .${classes.mo}`]: { backgroundPosition: '-240px -216px' },
    [`& .${classes.mp}`]: { backgroundPosition: '-264px -216px' },
    [`& .${classes.mq}`]: { backgroundPosition: '-288px -216px' },
    [`& .${classes.mr}`]: { backgroundPosition: '-312px -216px' },
    [`& .${classes.ms}`]: { backgroundPosition: '-336px -216px' },
    [`& .${classes.mt}`]: { backgroundPosition: '-360px -216px' },
    [`& .${classes.mu}`]: { backgroundPosition: '-384px -216px' },
    [`& .${classes.mv}`]: { backgroundPosition: '-0px -240px' },
    [`& .${classes.mw}`]: { backgroundPosition: '-24px -240px' },
    [`& .${classes.mx}`]: { backgroundPosition: '-48px -240px' },
    [`& .${classes.my}`]: { backgroundPosition: '-72px -240px' },
    [`& .${classes.mz}`]: { backgroundPosition: '-96px -240px' },
    [`& .${classes.na}`]: { backgroundPosition: '-120px -240px' },
    [`& .${classes.nc}`]: { backgroundPosition: '-144px -240px' },
    [`& .${classes.ne}`]: { backgroundPosition: '-168px -240px' },
    [`& .${classes.nf}`]: { backgroundPosition: '-192px -240px' },
    [`& .${classes.ng}`]: { backgroundPosition: '-216px -240px' },
    [`& .${classes.ni}`]: { backgroundPosition: '-240px -240px' },
    [`& .${classes.nl}`]: { backgroundPosition: '-264px -240px' },
    [`& .${classes.no}`]: { backgroundPosition: '-288px -240px' },
    [`& .${classes.np}`]: { backgroundPosition: '-312px -240px' },
    [`& .${classes.nr}`]: { backgroundPosition: '-336px -240px' },
    [`& .${classes.nu}`]: { backgroundPosition: '-360px -240px' },
    [`& .${classes.nz}`]: { backgroundPosition: '-384px -240px' },
    [`& .${classes.om}`]: { backgroundPosition: '-0px -264px' },
    [`& .${classes.pa}`]: { backgroundPosition: '-24px -264px' },
    [`& .${classes.pe}`]: { backgroundPosition: '-48px -264px' },
    [`& .${classes.pf}`]: { backgroundPosition: '-72px -264px' },
    [`& .${classes.pg}`]: { backgroundPosition: '-96px -264px' },
    [`& .${classes.ph}`]: { backgroundPosition: '-120px -264px' },
    [`& .${classes.pk}`]: { backgroundPosition: '-192px -264px' },
    [`& .${classes.pl}`]: { backgroundPosition: '-216px -264px' },
    [`& .${classes.pn}`]: { backgroundPosition: '-240px -264px' },
    [`& .${classes.pr}`]: { backgroundPosition: '-264px -264px' },
    [`& .${classes.ps}`]: { backgroundPosition: '-288px -264px' },
    [`& .${classes.pt}`]: { backgroundPosition: '-312px -264px' },
    [`& .${classes.pw}`]: { backgroundPosition: '-336px -264px' },
    [`& .${classes.py}`]: { backgroundPosition: '-360px -264px' },
    [`& .${classes.qa}`]: { backgroundPosition: '-384px -264px' },
    [`& .${classes.ro}`]: { backgroundPosition: '-0px -288px' },
    [`& .${classes.rs}`]: { backgroundPosition: '-24px -288px' },
    [`& .${classes.ru}`]: { backgroundPosition: '-48px -288px' },
    [`& .${classes.rw}`]: { backgroundPosition: '-72px -288px' },
    [`& .${classes.sa}`]: { backgroundPosition: '-96px -288px' },
    [`& .${classes.sb}`]: { backgroundPosition: '-120px -288px' },
    [`& .${classes.sc}`]: { backgroundPosition: '-144px -288px' },
    [`& .${classes.sd}`]: { backgroundPosition: '-168px -288px' },
    [`& .${classes.se}`]: { backgroundPosition: '-192px -288px' },
    [`& .${classes.sg}`]: { backgroundPosition: '-216px -288px' },
    [`& .${classes.sh}`]: { backgroundPosition: '-240px -288px' },
    [`& .${classes.si}`]: { backgroundPosition: '-264px -288px' },
    [`& .${classes.sk}`]: { backgroundPosition: '-288px -288px' },
    [`& .${classes.sl}`]: { backgroundPosition: '-312px -288px' },
    [`& .${classes.sm}`]: { backgroundPosition: '-336px -288px' },
    [`& .${classes.sn}`]: { backgroundPosition: '-360px -288px' },
    [`& .${classes.so}`]: { backgroundPosition: '-384px -288px' },
    [`& .${classes.sr}`]: { backgroundPosition: '-0px -312px' },
    [`& .${classes.ss}`]: { backgroundPosition: '-24px -312px' },
    [`& .${classes.st}`]: { backgroundPosition: '-48px -312px' },
    [`& .${classes.sv}`]: { backgroundPosition: '-72px -312px' },
    [`& .${classes.sy}`]: { backgroundPosition: '-96px -312px' },
    [`& .${classes.sz}`]: { backgroundPosition: '-120px -312px' },
    [`& .${classes.tc}`]: { backgroundPosition: '-144px -312px' },
    [`& .${classes.td}`]: { backgroundPosition: '-168px -312px' },
    [`& .${classes.tf}`]: { backgroundPosition: '-192px -312px' },
    [`& .${classes.tg}`]: { backgroundPosition: '-216px -312px' },
    [`& .${classes.th}`]: { backgroundPosition: '-240px -312px' },
    [`& .${classes.tj}`]: { backgroundPosition: '-264px -312px' },
    [`& .${classes.tk}`]: { backgroundPosition: '-288px -312px' },
    [`& .${classes.tl}`]: { backgroundPosition: '-312px -312px' },
    [`& .${classes.tm}`]: { backgroundPosition: '-336px -312px' },
    [`& .${classes.tn}`]: { backgroundPosition: '-360px -312px' },
    [`& .${classes.to}`]: { backgroundPosition: '-384px -312px' },
    [`& .${classes.tr}`]: { backgroundPosition: '-0px -336px' },
    [`& .${classes.tt}`]: { backgroundPosition: '-24px -336px' },
    [`& .${classes.tv}`]: { backgroundPosition: '-48px -336px' },
    [`& .${classes.tw}`]: { backgroundPosition: '-72px -336px' },
    [`& .${classes.tz}`]: { backgroundPosition: '-96px -336px' },
    [`& .${classes.ua}`]: { backgroundPosition: '-120px -336px' },
    [`& .${classes.ug}`]: { backgroundPosition: '-144px -336px' },
    [`& .${classes.us}`]: { backgroundPosition: '-168px -336px' },
    [`& .${classes.uy}`]: { backgroundPosition: '-192px -336px' },
    [`& .${classes.uz}`]: { backgroundPosition: '-216px -336px' },
    [`& .${classes.va}`]: { backgroundPosition: '-240px -336px' },
    [`& .${classes.vc}`]: { backgroundPosition: '-264px -336px' },
    [`& .${classes.ve}`]: { backgroundPosition: '-288px -336px' },
    [`& .${classes.vg}`]: { backgroundPosition: '-312px -336px' },
    [`& .${classes.vi}`]: { backgroundPosition: '-336px -336px' },
    [`& .${classes.vn}`]: { backgroundPosition: '-360px -336px' },
    [`& .${classes.vu}`]: { backgroundPosition: '-384px -336px' },
    [`& .${classes.wf}`]: { backgroundPosition: '-0px -360px' },
    [`& .${classes.ws}`]: { backgroundPosition: '-24px -360px' },
    [`& .${classes.ye}`]: { backgroundPosition: '-48px -360px' },
    [`& .${classes.za}`]: { backgroundPosition: '-96px -360px' },
    [`& .${classes.zm}`]: { backgroundPosition: '-120px -360px' },
    [`& .${classes.zw}`]: { backgroundPosition: '-144px -360px' }
  };
});

const DIGIT_REGEX = /\d+/;
const getRawMask = (mask) => mask.replace(/[\WX]/g, '');
const getRawValue = (value) => value.replace(/\W/g, '');
const chunkSeparator = '|';

const getBestMatchingFormat = (formats, value) =>
  formats
    .filter((format) => {
      const rawMask = format.mask.replace(/[\WX]/g, '');
      const maskRegExp = new RegExp(`^${rawMask}`);
      return value.search(maskRegExp) !== -1;
    })
    .reduce((acc, format) => {
      if (!acc.format) {
        return {
          format
        };
      }
      const currentMaskLength = getRawMask(format.mask).length;
      const prevMask = getRawMask(acc.format.mask).length;

      return currentMaskLength > prevMask
        ? {
            format,
            maskLength: currentMaskLength
          }
        : acc;
    }, {});

const getBestMatchingCountryCode = (bestMatched, defaultFlagName) =>
  bestMatched?.format?.iso2 ? bestMatched.format.iso2 : defaultFlagName;

const getMaskedValue = (value, mask, placeholder = false) => {
  if (!mask) {
    return value;
  }

  const rawValue = getRawValue(value.toString());
  const maskTemplate = mask.replace(/\d/g, 'X');
  const splitMask = maskTemplate.split('');
  const splitValue = rawValue.split('');
  const resultLength = splitMask.length;

  let maskIndex;
  let valueIndex = 0;

  // eslint-disable-next-line no-plusplus
  for (maskIndex = 0; maskIndex < resultLength; maskIndex++) {
    if (valueIndex >= splitValue.length) {
      break;
    }

    if (splitMask[maskIndex] === 'X' && splitValue[valueIndex].match(/\d/)) {
      // eslint-disable-next-line no-plusplus
      splitMask[maskIndex] = splitValue[valueIndex++];
    } else if (splitMask[maskIndex] === 'X') {
      splitMask.slice(0, maskIndex);
    }
  }

  return placeholder ? splitMask.join('') : splitMask.join('').substr(0, maskIndex);
};

const getFormatByCountryCode = (countryCode, formats) => {
  return formats.find(({ iso2 }) => iso2 === countryCode);
};

const getInitialMaskedValue = (value, formats, countryCode) => {
  if (value) {
    const { format } = getBestMatchingFormat(formats, value);
    const mask = format ? format.mask : '';
    return `${getMaskedValue(value, mask)}`;
  }

  if (countryCode && !value) {
    const initialFormat = getFormatByCountryCode(countryCode, formats);
    return initialFormat ? `+${getRawMask(initialFormat.mask)}` : '';
  }

  return '';
};

const getFormatsFromOptions = (options) => {
  return Object.entries(options).reduce((acc, [iso3, format]) => {
    if (format.masks.length > 0) {
      const maskedFormats = format.masks.map((mask) => ({
        iso2: format.iso2,
        name: format.name,
        iso3,
        mask
      }));
      return [...acc, ...maskedFormats];
    }

    return acc;
  }, []);
};

const InputPhone = ({ fieldData, className }) => {
  const {
    label,
    options,
    name,
    identifier,
    required,
    placeholder,
    readonly,
    inputmode,
    disabled,
    muiHelperText,
    autocomplete,
    nameForErrorMessage,
    pattern,
    title
  } = fieldData;
  const { isFormDisabled, isFormReadOnly, formType, handleCloseAlert } =
    useContext(FormConfigContext);
  const [pendingForValue, pendingForValueFieldOptions] = usePendingForValueFieldOptions(formType);
  const { disabled: pendingDisabledState } = pendingForValueFieldOptions;

  const {
    formState: { errors, touchedFields },
    setError,
    clearErrors,
    control,
    setValue
  } = useFormContext();
  const { t } = useTranslation();

  const formats = useMemo(() => getFormatsFromOptions(options), [options]);

  const [state, setState] = useState({
    mask: '',
    value: getInitialMaskedValue('+', formats, ''),
    countryCode: '',
    isMaskSelected: false,
    defaultFlagName: ''
  });

  const validateWithMask = (maskedValue, mask) => {
    if (mask.length > 0 && mask.length !== maskedValue.length) {
      setError(name, { message: t('Please enter a valid phone number') });
      return false;
    }
    return true;
  };
  const validateWithRequired = (maskedValue) => {
    if (!DIGIT_REGEX.test(maskedValue)) {
      const errorMessage = nameForErrorMessage
        ? t('This is required field with name', { nameForErrorMessage })
        : t('This is required field');
      setError(name, { message: errorMessage });
      return false;
    }
    return true;
  };

  const checkValidation = (maskedValue, mask) => {
    const valueIsValidWithMask = validateWithMask(maskedValue, mask);
    const valueIsValidWithRequired = validateWithRequired(maskedValue);
    if (valueIsValidWithMask && valueIsValidWithRequired) {
      clearErrors(name);
    }
  };

  const handlePhoneChange = (event) => {
    handleCloseAlert?.();

    const { mask, countryCode, isMaskSelected, defaultFlagName } = state;
    const { value } = event.target;

    const rawValue = getRawValue(value);
    const rawActiveMask = mask.replace(/[\WX]/g, '');

    setValue(name, rawValue, { shouldDirty: true });
    const phoneRegex = pattern ? new RegExp(pattern) : /^(\d)*$/;
    if (
      (mask && value.search(/^[+]/g) === -1) ||
      !phoneRegex.test(rawValue) ||
      (!!mask && value.length > mask.length)
    ) {
      return;
    }

    if (isMaskSelected) {
      const maskedValue = getMaskedValue(value, mask);

      checkValidation(maskedValue, mask);

      setState((prevState) => ({
        ...prevState,
        value: maskedValue.length < 1 ? '+' : maskedValue,
        hasValue: !!value.length,
        isMaskSelected: !(rawValue.length < rawActiveMask.length),
        mask: maskedValue.length < 1 ? '' : mask,
        countryCode: rawValue.length < rawActiveMask.length ? defaultFlagName : countryCode
      }));
    } else {
      const bestMatchingFormat = getBestMatchingFormat(formats, rawValue);

      const targetMask = bestMatchingFormat.format ? bestMatchingFormat.format.mask : mask;
      const bestMatchingCountryCode = getBestMatchingCountryCode(
        bestMatchingFormat,
        defaultFlagName
      );

      const maskedValue = getMaskedValue(value, targetMask);
      checkValidation(maskedValue, mask);
      setState((prevState) => ({
        ...prevState,
        value: maskedValue.length < 1 ? '+' : maskedValue,
        hasValue: !!value.length,
        mask: maskedValue.length < 1 ? '' : targetMask,
        countryCode: bestMatchingCountryCode
      }));
    }
  };

  const handleSelectChange = (event) => {
    const { value } = event.target;
    const chunkedValue = value.split(chunkSeparator);

    const countryCode =
      chunkedValue[0] && chunkedValue[0] !== 'undefined' ? chunkedValue[0] : state.defaultFlagName;

    const phoneCode = chunkedValue[1] ? chunkedValue[1].replace(/X|\W(?=X)|[)-](?=\sX)/g, '') : '';

    setState((prevState) => {
      return {
        ...prevState,
        countryCode,
        mask: chunkedValue[1],
        value: phoneCode,
        isMaskSelected: true
      };
    });
  };

  const renderItemsList = () =>
    formats.map(({ iso2, mask, name: formatName }) => (
      <option key={`${formatName} ${mask}`} value={`${iso2}${chunkSeparator}${mask}`}>
        {`${iso2}${'\u00a0'.repeat(4)}${mask}`}
      </option>
    ));

  return (
    <StyledInputPhoneWrapper className={classnames(classes.root, className)}>
      <InputLabel error={!!errors[name] && !!touchedFields[name]} required={required}>
        {label}
      </InputLabel>
      <Controller
        control={control}
        data-testid="input-phone"
        defaultValue=""
        name={name}
        render={(params) => {
          const { ref } = params;
          return (
            <div className={classes.fields}>
              <div className={classes['select-wrapper']}>
                <Select
                  native
                  className={classes.select}
                  error={!isFormReadOnly && !readonly && !!touchedFields[name] && !!errors[name]}
                  sx={{ pl: '25px' }}
                  value={`${state.countryCode}${chunkSeparator}${state.mask}`}
                  variant="standard"
                  onChange={handleSelectChange}
                >
                  {renderItemsList()}
                </Select>
                <div
                  className={classnames(classes.flag, classes[state.countryCode.toLowerCase()])}
                />
              </div>
              <div className={classes['input-wrapper']}>
                <Input
                  ref={ref}
                  autoComplete={autocomplete}
                  className={classes.input}
                  disabled={pendingForValue ? pendingDisabledState : isFormDisabled || disabled}
                  error={!isFormReadOnly && !readonly && !!touchedFields[name] && !!errors[name]}
                  id={identifier}
                  inputProps={{ title, inputMode: inputmode }}
                  name={name}
                  placeholder={placeholder}
                  readOnly={isFormReadOnly || readonly}
                  required={required}
                  type="tel"
                  value={state.value}
                  onBlur={() => {
                    setValue(name, state.value.replace(/[^\d+]/g, ''), { shouldTouch: true });
                    checkValidation(state.value, state.mask);
                  }}
                  onChange={handlePhoneChange}
                />
                <div className={classes.mask}>{getMaskedValue(state.value, state.mask, true)}</div>
              </div>
            </div>
          );
        }}
      />

      {(errors[name] || muiHelperText) && (
        <FormHelperText error={!!touchedFields[name]}>
          {errors[name]?.message || muiHelperText}
        </FormHelperText>
      )}
    </StyledInputPhoneWrapper>
  );
};

InputPhone.propTypes = {
  fieldData: formFieldDataType.isRequired,
  className: string
};

InputPhone.defaultProps = {
  className: undefined
};

export default InputPhone;
