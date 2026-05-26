declare module 'gsap' {
  const gsap: any;
  export { gsap };
  export default gsap;
}

declare module 'gsap/ScrollTrigger' {
  const ScrollTrigger: any;
  export { ScrollTrigger };
  export default ScrollTrigger;
}

declare module 'gsap/all' {
  const gsap: any;
  const ScrollTrigger: any;
  export { gsap, ScrollTrigger };
}
