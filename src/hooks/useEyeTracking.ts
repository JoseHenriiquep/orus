import { useEffect, type RefObject } from 'react';

const REST = { x: 60, y: 40 } as const;
/** Quanto a pupila pode andar a partir do centro sem encostar no anel (raio interno 34 − pupila 13). */
const MAX_REACH = 19;
const IDLE_MS = 2600;
const EASE = 0.14;

interface Point {
  x: number;
  y: number;
}

/**
 * Faz a pupila do símbolo acompanhar o cursor (ou o toque e a rolagem em telas de toque)
 * e voltar a "olhar adiante" quando o visitante para. Não roda com movimento reduzido.
 */
export function useEyeTracking(svgRef: RefObject<SVGSVGElement>, pupilRef: RefObject<SVGCircleElement>, enabled: boolean) {
  useEffect(() => {
    const svg = svgRef.current;
    const pupil = pupilRef.current;
    if (!enabled || !svg || !pupil) return undefined;

    const current: Point = { ...REST };
    let target: Point = { ...REST };
    let frame = 0;
    let idleTimer = 0;

    const tick = () => {
      current.x += (target.x - current.x) * EASE;
      current.y += (target.y - current.y) * EASE;
      pupil.setAttribute('cx', current.x.toFixed(2));
      pupil.setAttribute('cy', current.y.toFixed(2));
      const moving = Math.abs(target.x - current.x) > 0.04 || Math.abs(target.y - current.y) > 0.04;
      frame = moving ? requestAnimationFrame(tick) : 0;
    };

    const goTo = (point: Point) => {
      target = point;
      if (!frame) frame = requestAnimationFrame(tick);
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        target = { ...REST };
        if (!frame) frame = requestAnimationFrame(tick);
      }, IDLE_MS);
    };

    const lookAt = (clientX: number, clientY: number) => {
      const box = svg.getBoundingClientRect();
      const dx = clientX - (box.left + box.width / 2);
      const dy = clientY - (box.top + box.height / 2);
      const distance = Math.hypot(dx, dy) || 1;
      const reach = Math.min(1, distance / (box.width * 0.9)) * MAX_REACH;
      goTo({ x: 50 + (dx / distance) * reach, y: 50 + (dy / distance) * reach });
    };

    const onPointer = (event: PointerEvent) => lookAt(event.clientX, event.clientY);
    const onScroll = () => {
      const k = Math.max(-1, Math.min(1, window.scrollY / 480));
      goTo({ x: 50, y: 50 + k * MAX_REACH });
    };

    const isTouch = window.matchMedia('(hover: none)').matches;
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('pointerdown', onPointer, { passive: true });
    if (isTouch) window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('pointerdown', onPointer);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
      window.clearTimeout(idleTimer);
    };
  }, [svgRef, pupilRef, enabled]);
}
