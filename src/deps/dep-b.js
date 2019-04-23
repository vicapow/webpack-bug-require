import depA from './dep-a';

export function bsFunction() {
  return 'bsFunction';
}

export default function () {
  return `dep b... ${depA()}`;
}