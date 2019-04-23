import { bsFunction } from './dep-b';

export default function() {
  return `dep a function calling bsFunction ${bsFunction()}`;
}