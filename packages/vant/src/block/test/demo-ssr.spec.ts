/**
 * @vitest-environment node
 */
import Demo from '../demo/index.vue';
import { snapshotDemo } from '../../../test/demo';

snapshotDemo(Demo, { ssr: true });
