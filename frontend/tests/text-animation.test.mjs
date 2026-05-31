import test from 'node:test'
import assert from 'node:assert/strict'

import { segmentGraphemes } from '../app/utils/textSegmentation.js'

test('animated text segmentation keeps Thai tone marks attached to their base letter', () => {
  assert.deepEqual(segmentGraphemes('ลี่'), ['ลี่'])
  assert.ok(segmentGraphemes('เปลี่ยน').includes('ลี่'))
})
