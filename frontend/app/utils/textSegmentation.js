const markRegex = /^\p{Mark}$/u

export const segmentGraphemes = (text) => {
  if (typeof Intl?.Segmenter === 'function') {
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' })
    return Array.from(segmenter.segment(text), segment => segment.segment)
  }

  return Array.from(text).reduce((segments, char) => {
    if (markRegex.test(char) && segments.length > 0) {
      segments[segments.length - 1] += char
      return segments
    }

    segments.push(char)
    return segments
  }, [])
}
