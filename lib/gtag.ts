const GA_TRACKING_ID = 'G-D4V1L7P2DG';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: any) => {
  if (typeof window !== 'object') return;
  window.gtag('config', GA_TRACKING_ID as string, {
    page_path: url,
  });
};

type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value: number;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEvent) => {
  if (typeof window !== 'object') return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
