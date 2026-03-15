import type { Metric } from 'web-vitals'

/**
 * Reports Core Web Vitals to the console (dev) or an analytics endpoint (prod).
 * Swap `console.log` for your analytics provider (e.g. Google Analytics, Datadog).
 */
export function reportWebVitals(metric: Metric): void {
  if (process.env.NODE_ENV !== 'production') {
    const color = metric.rating === 'good' ? '#22c55e' : metric.rating === 'needs-improvement' ? '#f59e0b' : '#ef4444'
    console.log(
      `%c[Web Vitals] ${metric.name}: ${Math.round(metric.value)}${metric.name === 'CLS' ? '' : 'ms'} (${metric.rating})`,
      `color:${color};font-weight:bold`,
    )
  }

  // Production: send to your analytics endpoint
  // if (import.meta.env.PROD) {
  //   fetch('/api/vitals', { method: 'POST', body: JSON.stringify(metric) })
  // }
}
