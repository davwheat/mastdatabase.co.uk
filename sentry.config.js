import * as Sentry from '@sentry/gatsby'

const __IS_DEV__ = process.env.NODE_ENV !== 'production'

Sentry.init({
  dsn: 'https://279592508f584cf4ba1bea11482ddf89@o991058.ingest.sentry.io/6778122',
  sampleRate: __IS_DEV__ ? 1.0 : 0.7, // Adjust this value in production
  // beforeSend(event) {
  //   return event
  // },
  release: process.env.RELEASE,
})
