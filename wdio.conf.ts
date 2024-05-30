import type { Reporters, Options } from '@wdio/types'
import { join } from 'node:path';
import VideoReporter from 'wdio-video-reporter';
const downloadDir = join(process.cwd(), 'tempDownload');


export const config: Options.Testrunner = {
    runner: 'local',
    specs: [`${process.cwd()}/test/**/*.spec.ts`],
    maxInstances: 1,
    capabilities: [
        {
          browserName: 'chrome',
          'goog:chromeOptions': {
            w3c: true,
            args: [
              '--headless',
              '--use-gpu-in-tests',
              '--window-size=1920,1080',
              '--allow-http-background-page',
              '--allow-running-insecure-content',
              '--allow-insecure-localhost',
              '--no-sandbox',
              '--disable-extensions',
              '--disable-gpu',
              '--disable-web-security',
              '--disable-popup-blocking',
              '--disable-features=EnableEphemeralFlashPermission',
              '--disable-password-manager',
              '--disable-save-password-bubble',
              '--disable-dev-shm-usage',
            ],
            prefs: {
              download: {
                prompt_for_download: false,
                default_directory: downloadDir,
              },
              'profile.managed_default_content_settings.popups': 2,
              'profile.managed_default_content_settings.notifications': 2,
              profile: {
                content_settings: {
                  popups: 2,
                  'exceptions.plugins.*,*.setting': 1,
                },
              },
              loggingPrefs: {
                driver: 'TRACE',
                browser: 'TRACE',
              },
              'credentials_enable_service': false,
              'profile.password_manager_enabled': false,
            } as any,
          },
        } as WebdriverIO.Capabilities,
      ],
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            project: './test/tsconfig.json',
            transpileOnly: true
        }
    },
    logLevel: 'error',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 2,
    services: ['visual'],
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    reporters: [
        ['spec', { passed: '✓', skipped: '-', failed: '✖' }],
        [
          'allure',
          {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
            disableMochaHooks: false,
          },
        ],
        [
          VideoReporter,
          {
            saveAllVideos: true,
            videoSlowdownMultiplier: 5, // Higher to get slower videos, lower for faster videos [Value 1-100]
          },
        ],
      ] as Reporters.ReporterEntry[],
};
