import { test } from 'node:test';
import assert from 'node:assert/strict';
import { deployment } from '../deployment.config.mjs';

test('custom domain deployment uses root paths', () => {
  assert.equal(deployment.site, 'https://www.xuanwentao.cn');
  assert.equal(deployment.base, '/');
});
