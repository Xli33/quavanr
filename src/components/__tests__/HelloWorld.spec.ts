import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import ThemeMenu from '../ThemeMenu.vue';

describe('ThemeMenu', () => {
  it('renders properly', () => {
    const wrapper = mount(ThemeMenu, { props: { msg: 'Hello Vitest' } });
    expect(wrapper.text()).toContain('Hello Vitest');
  });
});
